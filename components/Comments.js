import React, { Component } from 'react'
import Input from './Input'

export class Comments extends Component {
  render(){
    const {children,label, input, name} = this.props;
    return(
      <Input
        {...input}
        type={'textarea'}
        label={label}
        placeholder={children}
        name={name}
      />
    )
  }
}

Comments.defaultProps = {
  label: '',
  children: '',
  name: 'comments',
}

export default Comments;