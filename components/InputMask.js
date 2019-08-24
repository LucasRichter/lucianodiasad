import React from 'react'
import ReactInputMask from 'react-input-mask'
import TextField from './TextField'

const InputMask = (props) =>
  <ReactInputMask {...props}>
    { (inputProps) => <TextField {...inputProps} white /> }
  </ReactInputMask>

export default InputMask
