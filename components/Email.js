import React, {Component} from 'react'
import Input from './Input'

export class Email extends Component {
  render(){
    const {input, label, children, name} = this.props;
    return(
      <Input
        {...input}
        type={'email'}
        label={label}
        placeholder={children}
        name={name}
      />
    )
  }
}

Email.defaultProps = {
  label: '',
  children: '',
  name: 'email',
}

export default Email;