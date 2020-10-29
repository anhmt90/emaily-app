const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    /** 
     * Subdocument RecipientSchema to bypass 4MB doc limit of mongodb (vid 10.6) 
     */
    recipients: [RecipientSchema],
    yes: {
        type: Number,
        default: 0,
    },
    no: {
        type: Number,
        default: 0,
    },
    /**
     * Set up relationship to User collection by foreign key
     */
    _user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);