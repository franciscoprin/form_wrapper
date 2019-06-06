import React, {Component} from 'react'
import Input from './Input'

export class FileUpload extends Component {
  render(){
    const {children, label, input, name} = this.props;
    return(
      <Input
        {...input}
        type={'file'}
        label={label}
        placeholder={children}
        name={name}
      />
    )
  }
}

FileUpload.defaultProps = {
  label: '',
  children: '',
  name: 'file',
}

export default FileUpload;