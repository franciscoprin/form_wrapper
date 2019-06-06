import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Input} from '../components';
import PropType from 'prop-types';
import validator from 'validator';
import sendEmail from '../lib/Api.js'
import { connect } from 'react-redux'

export class FormWrapper extends Component {
  static propTypes = {
    intl: PropType.object.isRequired
  }
  state = {
    error: false,
    isFetched: false
  }
  submitForm = async values => {
    // Receive `getBookingInfo` from `<FormContainer />`
    // Receive `reset` from reduxForm HOC.
    const { sendEmail, reset } = this.props;
    return sendEmail(values).then(({ payload }) => {
      if (payload.message) {
        // Set state for successful server response.
        this.setState(state => ({
          ...state,
          isFetched: true,
        }))
      } else if (payload.error) {
        // Set state for failed server response.
        this.setState(state => ({
          ...state,
          error: true,
          isFetched: true,
        }))
      }
      // Clear the form after submit.
      reset()
    })
  }

  // Render the appropriate response to the user on server response.
  renderResponse = () => {
    const { error, isFetched } = this.state
    if (isFetched && error) {
      return <strong>{this.props.intl.formatMessage("there is a error")}</strong>
    } else if (!error && isFetched) {
      return (
        <strong>{this.props.intl.formatMessage("it was successful")}</strong>
      )
    }
  }

  getNewChild = (obj) => {
    // Get element and form props.
    const {handleSubmit,} = this.props;
    const {children,label,name,type,id} = obj.props;
    // Mutetate Form's element
    switch(obj.type.name){
      case 'Email': return (
        <Field
          label={label}
          name={id}
          placeholder={children}
          component={Input}
        />
      );
      case 'Comments': return (
        <Field
          label={label}
          name={name}
          placeholder={children}
          component={Input}
        />
      );
      case 'Button': return (
        <button
          type={type}
          name={name}
          onClick={handleSubmit(this.submitForm)}
        >
          {children}
        </button>
      );
      default: return obj;
    }
  }

  render() {
    // Receive `handleSubmit` & `valid` from reduxForm HOC
    // `intl` is from `react-intl` pay no attention.
    // Pass `handleSubmit()` our declared function for handling the form submit event.
    const _children = React.Children.map(this.props.children, child => {
      // Clone child/
      const _child =  React.cloneElement(child,{});
      // Return modified child.
      return this.getNewChild(_child);
    })
    return (
      <form>
        {_children}
      </form>
    )
  }
}

// Wrap your form in the reduxForm HOC and pass options object as argument.
const FormWithoutStore =  reduxForm({
  form: 'booking',
  validator, // form level validation
})(FormWrapper)

const Form = connect(null, {
  sendEmail
})(FormWithoutStore)

export default Form;