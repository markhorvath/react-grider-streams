import React from 'react';
import { Field, reduxForm } from 'redux-form';
//import connect so the action-creator createStream can act on this component
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component {
    renderError({ error, touched }) {
        if(error && touched) {
            return (
                <div className="ui error message">
                    <div className="header">{error}
                    </div>
                </div>
            );
        }
    }
    //changed to arrow function to get this.rendorError to work
    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        console.log(meta);
        //originaly was "formProps" in arg,
        //also <input value={formProps.input.value} onChange={formProps.input.onChange} /> but
        //we implemented destructuring, so basically this should have value and onChange attributes
        //equal to whatever it is in the "formProps.input"
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit(formValues) {
        console.log(formValues);
    }

    render() {
        //component prop is added to Field to actually be able to render the Field (will thro error if its not there)
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title: " />
                <Field name="description" component={this.renderInput} label="Enter Description: " />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

//this validate function needs to get connected to the redux-form so it gets used
//we do this by passing it in the reduxForm function we export at the bottom (and because it's
//just validate: validate we can destructure it)
const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        //only runs if user did not enter title
        errors.title = "Title is required";
    }
    if (!formValues.description) {
        errors.description = "Description is required";
    }
    //the idea here is that our errors object has properties with an IDENTICAL name to the 'name' attributes
    //we provided the to Field components above (i.e. 'title' and 'description'), so if the error object has the same name
    //and contains a string (with the error message) that string will get passed down to component={this.renderInput} within that Field
    return errors;

    //you can try console.log(meta) under renderInput() to see that there's an error property that comes with 'meta' and which should have
    //the corresponding error message
}

export default reduxForm({
    form: 'createStream',
    validate
})(StreamCreate);