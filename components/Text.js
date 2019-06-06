import React, {Component} from 'react'
import Input from './Input'

export class Text extends Component {
  render(){
    const {input, label, children, name} = this.props;
    return(
      <Input
        {...input}
        type={'text'}
        label={label}
        placeholder={children}
        name={name}
      />
    )
  }
}

Text.defaultProps = {
  label: '',
  children: '',
  name: 'text',
}

export default Text;