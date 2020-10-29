import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

/**
 * SurveyNew shows SurveyForm and SurveyFormReview
 */
class SurveyNew extends Component {
    /** Rather than writing down constructor(), this kind of initializing 
     * local state is enabled by the babel plugin installed and abstracted 
     * away by react-create-app for us
     */
    state = {
        /** decide whether the user can enter the SurveyFormReview page or not */
        showFormReview: false
    };

    renderContent() {
        if (this.state.showFormReview) {
            return <SurveyFormReview onReviewCancel={() => this.setState({ showFormReview: false })} />;
        }
        return <SurveyForm onSurveySubmit={() => this.setState({ showFormReview: true })} />;
    }

    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm',
    destroyOnUnmount: true
})(SurveyNew);