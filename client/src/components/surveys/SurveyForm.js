import React, { Component } from 'react';
import _ from 'lodash';

/** 
 * reduxForm allows our component to communicate with the redux store 
 * -> nearly identical to connect() of redux
 * 
 * The strength of redx-form is wiring up all different envent handlers
 * for watching changes to the inputs
 */
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

/**
 * SurveyForm shows a form for a user to add input
 */
class SurveyForm extends Component {
    /**
     * helper method to isolate small snippets of JSX we want 
     * to operate on in detail
     */
    renderFields() {
        return (
            _.map(formFields, ({ label, name }) => {
                return (
                    <Field
                        /**can be string e.g. input, textarea or be a custom component */
                        component={SurveyField}

                        /** Custom props to pass down to component={SurveyField} */
                        label={label}
                        type='text'
                        name={name}

                        /** suppress the Warning when creating a list of html elements */
                        key={name}
                    />
                );
            })
        );
    }

    render() {
        return (
            <div>
                <form
                    /**handleSubmit is the props given to us by redux-form */
                    onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
                >
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type='submit' className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    /**
     * the arg is the object containing all the fields with the 
     * values the user has typed in
     */

    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = `You must provide ${name}`;
        }
    });


    /**
     * Return an empty errors object will make redux-form assume 
     * the submitted form has no errors. Otherwise, it will look at the
     * in that obj for the same property names in the form and assumes 
     * such properties are invalid
     */
    return errors;
}

/** 
 * reduxForm() takes only 1 arg as an object with only a single required field: `form` 
 * 
 * validate field: auto-run a function whenever the user submits the form
 */
export default reduxForm({
    validate: validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);