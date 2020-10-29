/**
 * SurveyFormReview shows users their form inputs for review
 */
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview = ({ onReviewCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields, ({ label, name }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="yellow darken-3 white-text btn-flat" onClick={onReviewCancel}>
                Back
            </button>

            <button
                onClick={() => submitSurvey(formValues, history)}
                className="green white-text btn-flat right"
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        formValues: state.form.surveyForm.values
    };
};

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));