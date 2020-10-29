const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');  /** helper to parse urls */

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
// const recipientSchema = require('../models/Recipient');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

/**
 * We don't require in the SurveySchema directly here to get around the issues with testing
 * when we attempt require a model file multiple times in a project
 */
const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        /**
         * this query for surveys could pull up a large amount of Recipient subdocuments
         * associated with each Survey 
         * 
         * --> Solution: tell mongoose to exclude the Recipients using select() by mongoose ODM
         * --> Alt. solution: use virtual documents
         */
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false });
        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        res.send('Thanks for voting!');
    });

    /** SendGrid will make a POST req to this route to give us click events of user answering a survey */
    app.post('/api/surveys/webhooks', (req, res) => {
        const p = new Path('/api/surveys/:surveyId/:choice');
        _.chain(req.body)
            .map(({ url, email }) => {
                /**
                 * extract only the route or the path name of the URL, leaving out the domain
                 * then use p.test to extract only  :surveyId and :choice and put these 2 properties
                 * into a match object
                 */
                const match = p.test(new URL(url).pathname);
                if (match)
                    return { email, ...match };
            })
            .compact()                      /** filter out `undefined` elements */
            .uniqBy('email', 'surveyId')    /** filter out duplicate events */
            .each(({ surveyId, email, choice }) => {
                Survey.updateOne({
                    _id: surveyId,
                    recipients: {
                        $elemMatch: { email, responded: false }
                    }
                }, {
                    /** [choice] is key interpolation (ES6) syntax */
                    $inc: { [choice]: 1 },
                    /** the $ refers to the elements matched by $elemMatch in the find phrase  */
                    $set: { 'recipients.$.responded': true },
                    lastResponded: new Date()
                }).exec();
            })
            .value();


        res.send();
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            body,
            subject,
            recipients: recipients.split(',').map(email => ({ email })),
            _user: req.user.id,
            dateSent: Date.now(),
        });

        /**
         * Send the (patch) Mailer to SendGrid
         */
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();

            res.send(user);
        } catch (err) {
            res.status(422).send(err);
        }

    });
};