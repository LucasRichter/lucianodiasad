import React, { Component } from 'react'
import PageHead from '../../components/PageHead'
import { Box } from '@rebass/grid'
import { H1 } from '../../components/Title'
import { TextField, Button } from '@material-ui/core'
import { withSnackbar } from 'notistack'
import Axios from 'axios'
import PropTypes from 'prop-types'

class IndexPage extends Component {
  static propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired
  }

  async componentDidMount() {
    const token = localStorage.getItem('ADV_TOKEN')
    if (token) {
      document.location.pathname = '/admin/dashboard'
    }
  }

  state = {
    email: '',
    password: ''
  }

  onSubmit = () => {
    const { enqueueSnackbar } = this.props
    Axios.post('/api/auth', this.state)
      .then(({ data }) => {
        localStorage.setItem('ADV_TOKEN', data.token)
        document.location.pathname = '/admin/dashboard'
        enqueueSnackbar('Logado com sucesso!', { variant: 'success' })
      })
      .catch(() => enqueueSnackbar('Dados incorretos!', { variant: 'error' }))
  }

  onChange = e => {
    e.preventDefault()
    const { id, value } = e.target

    this.setState({ [id]: value })
  }

  render () {
    return (
      <main>
        <PageHead
          title='Luciano Dias | Admin'
          description='Login'
        />

        <Box
          css={{ backgroundColor: 'white', textAlign: 'center' }}
          m={['20px 0', '0']}
          p={['20px', '40px 0']}
        >
          <H1 centered>
            Admin area
          </H1>

          <Box my='20px'>
            <TextField
              onChange={this.onChange}
              autoFocus
              margin='dense'
              id='email'
              type='email'
              label='Username'
            />
          </Box>
          <Box my='20px'>
            <TextField
              onChange={this.onChange}
              margin='dense'
              id='password'
              type='password'
              label='Senha'
            />
          </Box>
          `<Button variant='contained' onClick={this.onSubmit} color='primary' size='large'>
                Entrar
          </Button>`
        </Box>

      </main>
    )
  }
}

export default withSnackbar(IndexPage)
