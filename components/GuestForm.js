import React, { useState } from 'react'
import PropTypes from 'prop-types'
import InputMask from './InputMask'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { postGuest } from '../services/eventsServices'
import { withSnackbar } from 'notistack'

const GuestForm = ({ event, open, onClose, enqueueSnackbar }) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  const onSubmit = async () => {
    try {
      setLoading(true)
      await postGuest({event, ...data})
      onClose()
      enqueueSnackbar(`Nome adicionado a lista :)`, { variant: 'success' })
    } catch (error) {
      if (error.response) {
        let {message, errors} = error.response.data
        if (errors) {
          message = Object.values(errors).join(', ')
        }
        enqueueSnackbar(message, { variant: 'error' })
      }
    }
  }

  const onChange = e => {
    e.preventDefault()
    const { id, name, value } = e.target
    const key = id || name

    setData({ ...data, [key]: value })
  }

  return (
    <Dialog
      open={open}
      fullWidth
      onClose={onClose}
      aria-labelledby='form-dialog-title'
    >
      <DialogTitle id='form-dialog-title'>Ficha de inscrição</DialogTitle>
      <DialogContent>
        <TextField
          onChange={onChange}
          autoFocus
          margin='dense'
          id='name'
          label='Nome completo'
          fullWidth
        />
        <TextField
          onChange={onChange}
          margin='dense'
          id='email'
          label='E-mail'
          type='email'
          fullWidth
        />
        <TextField
          onChange={onChange}
          margin='dense'
          id='name'
          label='Nome da Instituição'
          fullWidth
        />
        <InputMask
          onChange={onChange}
          margin='dense'
          id='cnpj'
          label='CNPJ'
          mask='99.999.999/9999-99'
          maskChar={null}
          fullWidth
        />
        <InputMask
          onChange={onChange}
          margin='dense'
          id='phone'
          label='Telefone'
          mask='(99) 99999-9999'
          maskChar={null}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
              Cancelar
        </Button>
        <Button onClick={onSubmit} loading={loading} color='primary'>
              Enviar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

GuestForm.propTypes = {
  event: PropTypes.string.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func
}

export default withSnackbar(GuestForm)
