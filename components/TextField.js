import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormHelperText from '@material-ui/core/FormHelperText'

import colors from '../helpers/colors'

const styles = () => ({
  container: {
    width: '100%',
    margin: '0px'
  },
  white: {
    left: '6px',
    'font-size': '15px',
    'font-family': 'Karla',
    'color': 'white',
    '&$focused': {
      color: colors.ruby
    },
    '&$error': {
      color: '#f44336'
    }
  },
  label: {
    left: '6px',
    'font-size': '15px',
    'font-family': 'Karla',
    '&$focused': {
      color: colors.ruby
    },
    '&$error': {
      color: '#f44336'
    }
  },
  input: {
    'font-family': 'Karla',
    'font-size': '15px'
  },
  centered: {
    'font-family': 'Karla',
    'font-size': '15px',
    'text-align': 'center'
  },
  focused: {},
  error: {},
  underlineWhite: {
    'color': 'white',
    '&:before': {
      borderBottomColor: 'white !important'
    },
    '&:hover:before': {
      borderBottomColor: 'white' + ' !important'
    },
    '&:after': {
      borderBottomColor: colors.ruby
    }
  },
  underline: {
    '&:hover:before': {
      borderBottomColor: colors.dark + ' !important'
    },
    '&:after': {
      borderBottomColor: colors.ruby
    }
  }
})

const TextField = ({
  name,
  type,
  label,
  errorText,
  classes,
  onChange,
  disabled,
  error,
  centered,
  white,
  useHandleChange,
  ...props
}) =>
  <FormControl className={classes.container} disabled={disabled} error={!!error}>
    {label &&
      <InputLabel
        htmlFor={name}
        error={!!error}
        FormLabelClasses={{
          root: white ? classes.white : classes.label,
          focused: classes.focused,
          error: classes.error
        }}
      >
        {label}
      </InputLabel>
    }
    <Input
      id={name}
      name={name}
      type={type}
      classes={{
        input: centered ? classes.centered : classes.input,
        underline: white ? classes.underlineWhite : classes.underline
      }}
      onChange={onChange}
      value={props.value}
      {...props}
    />
    {error && errorText &&
      <FormHelperText>
        {errorText}
      </FormHelperText>
    }
  </FormControl>

TextField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  errorText: PropTypes.string,
  disabled: PropTypes.bool,
  white: PropTypes.bool,
  error: PropTypes.any,
  centered: PropTypes.bool,
  value: PropTypes.any,
  useHandleChange: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  // used for withStyles from material-ui
  classes: PropTypes.object.isRequired,
  // used for masked inputs to override the inner component
  inputComponent: PropTypes.any
}

TextField.defaultProps = {
  type: 'text',
  useHandleChange: true
}

export default withStyles(styles)(TextField)
