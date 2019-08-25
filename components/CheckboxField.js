import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import colors from '../helpers/colors'

const styles = {
  label: {
    'font-size': '15px',
    'font-family': 'Lato'
  },
  root: {
    color: colors.dark,
    '&$checked': {
      color: colors.blue
    }
  },
  checked: {}
}

const CheckboxContainer = ({ classes, label, disabled, onChange, ...props }) =>
  <FormControlLabel
    disabled={disabled}
    classes={{
      label: classes.label
    }}
    control={
      <Checkbox
        {...props}
        classes={{
          root: classes.root,
          checked: classes.checked
        }}
        onChange={onChange}
      />
    }
    label={label}
  />

CheckboxContainer.propTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired
}

export default withStyles(styles)(CheckboxContainer)
