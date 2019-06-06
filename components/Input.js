import React from 'react'

// Custom component to pass to <Field />
const Input = ({input, label, type, placeholder, name}) => (
  <div>
    <label htmlFor={label} />
    <div>
      <input 
        {...input} 
        placeholder={placeholder} 
        name={name} 
        type={type} 
      />
      {/* touched && (error && <span>{error}</span>) */} 
    </div>
  </div>
)

export default Input