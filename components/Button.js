import React, { Component } from 'react'

export class Button extends Component {
  render(){
    const {children, type,onClick,} = this.props;
    return(
      <button 
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  children: '',
  type: '',
}

export default Button;