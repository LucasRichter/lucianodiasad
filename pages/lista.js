import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import SectionTitle from '../components/SectionTitle'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { getEvents, postList } from '../services/eventsServices'
import TextField from '@material-ui/core/TextField'
import { Flex, Box } from '@rebass/grid'
import Button from '@material-ui/core/Button'
import { H2 } from '../components/Title'
import FormControl from '@material-ui/core/FormControl'
import { withSnackbar } from 'notistack'
import InputMask from '../components/InputMask'

class lista extends Component {
  static propTypes = {
    event: PropTypes.string,
    events: PropTypes.array,
    enqueueSnackbar: PropTypes.func
  }

  static defaultProps = {
    events: []
  }

  componentDidMount() {
    const { event, events } = this.props

    if (event) {
      const find = events.find(e => e.permalink === event)
      if (find) {
        this.setState({ event: find._id })
      }
    }
  }

  static async getInitialProps({ query: { event } }) {
    const events = await getEvents({ lists: true })
    return { events, event }
  }

  state = {
    event: '',
    email: '',
    cnpj: '',
    phone: ''
  }

  onSubmit = async () => {
    const { enqueueSnackbar } = this.props

    this.setState({ loading: true })
    try {
      await postList({
        ...this.state })

      enqueueSnackbar('Inscrição confirmada!', { variant: 'success' })
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

  onChange = e => {
    e.preventDefault()
    const { id, name, value } = e.target
    const key = id || name

    this.setState({ [key]: value })
  }

  render() {
    const { event } = this.state
    const { events } = this.props

    return (
      <main>
        <PageHead
          title='Daleclub | Lista Aniversário'
          description='Lista Aniversário'
        />

        <Box
          css={{ backgroundColor: 'white' }}
          p={['20px', '40px 120px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Lista'
            />
          </Box>

          <Flex
            alignItems='center'
            justifyContent='center'
            flexDirection='column'
            mx='auto'
            css={{ maxWidth: '500px' }}
          >
            <H2>
              Preencha seus dados abaixo:
            </H2>

            <FormControl style={{ width: '100%' }} >
              <InputLabel htmlFor='event'>Festa</InputLabel>
              <Select
                placeholder='Festa'
                value={event}
                onChange={this.onChange}
                inputProps={{
                  name: 'event',
                  id: 'event'
                }}
              >
                {events.map(e => (
                  <MenuItem key={e._id} value={e._id}>{e.party}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              onChange={this.onChange}
              autoFocus
              margin='dense'
              id='email'
              label='E-mail'
              type='email'
              fullWidth
            />

            <InputMask
              onChange={this.onChange}
              margin='dense'
              id='cnpj'
              label='CNPJ'
              mask='99.999.999/9999-99'
              maskChar={null}
              fullWidth
            />

            <InputMask
              onChange={this.onChange}
              margin='dense'
              id='phone'
              label='Telefone'
              mask='(99) 99999-9999'
              maskChar={null}
              fullWidth
            />

            <TextField
              onChange={this.onChange}
              margin='dense'
              id='name'
              label='Nome'
              fullWidth
            />

            <TextField
              onChange={this.onChange}
              margin='dense'
              id='company_name'
              label='Empresa'
              fullWidth
            />

            <Box mt='20px'>
              <Button variant='contained' onClick={this.onSubmit} color='primary' size='large'>
                Confirmar
              </Button>
            </Box>
          </Flex>

        </Box>

      </main>
    )
  }
}

export default withSnackbar(lista)
