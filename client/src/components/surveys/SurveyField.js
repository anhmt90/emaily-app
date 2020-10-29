/**
 * SurveyField contains logic to render a single label and text input 
 * 
 * This component will get many props passed from the redux-form and 
 * be rendered by the Field tag
 */
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
    // console.log(meta)
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
};