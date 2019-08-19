import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { PlusCircle, MinusCircle } from 'react-feather'
import { Flex } from '@rebass/grid'
import { postGuest } from '../services/eventsServices'
import { withSnackbar } from 'notistack'

class GuestForm extends React.Component {
  static propTypes = {
    party: PropTypes.string.isRequired,
    enqueueSnackbar: PropTypes.func.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func
  }

  state = {
    loading: false,
    email: '',
    current: 1,
    guests: {
      Nome: ''
    }
  }

  onSubmit = async () => {
    const { party, onClose, enqueueSnackbar } = this.props
    const { email, guests } = this.state

    this.setState({ loading: true })
    const names = Object.values(guests).filter(n => n)
    const data = {
      event: party,
      email,
      names
    }

    try {
      await postGuest(data)
      onClose()
      enqueueSnackbar(`Nome${names.length > 1 ? 's' : ''} adicionado a lista :)`, { variant: 'success' })
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

  add = () => {
    const { current, guests } = this.state
    const next = current + 1
    this.setState({
      current: next,
      guests: {
        ...guests,
        [`Nome [${next}]`]: ''
      }
    })
  }

  remove = id => {
    const guests = { ...this.state.guests }
    delete guests[id]
    this.setState({ guests })
  }

  onChange = e => {
    e.preventDefault()
    const { guests } = this.state
    const { id, value } = e.target

    if (id.includes('Nome')) {
      this.setState({
        guests: {
          ...guests,
          [id]: value
        }
      })
    } else {
      this.setState({ [id]: value })
    }
  }

  default = () => {
    this.setState({ isSuccess: false })
  }

  render() {
    const { open, onClose } = this.props
    const { guests } = this.state

    return (
      <Dialog
        open={open}
        fullWidth
        onClose={onClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Nome na lista</DialogTitle>
        <DialogContent>
          <TextField
            onChange={this.onChange}
            autoFocus
            margin='dense'
            id='email'
            label='E-mail'
            type='email'
            fullWidth
          />
          {Object.keys(guests).map((key, index) => (
            <Flex alignItems='center' key={key} justifyContent='center'>
              <TextField
                onChange={this.onChange}
                autoFocus
                margin='dense'
                id={key}
                label={`Nome ${index || ''}`}
                fullWidth
              />
              {key !== 'Nome' &&
              <MinusCircle style={{ margin: '0 20px' }} onClick={() => this.remove(key)} />
              }
            </Flex>
          ))
          }
          <Button variant='outlined' color='inherit' onClick={this.add} style={{ margin: '20px auto 0' }}>
            <PlusCircle style={{ margin: '0 20px' }} /> Adicionar nome
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color='primary'>
              Cancelar
          </Button>
          <Button onClick={this.onSubmit} loading={this.state.loading} color='primary'>
              Enviar
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withSnackbar(GuestForm)
