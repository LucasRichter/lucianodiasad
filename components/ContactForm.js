import React, { useState } from 'react'
import { Box, Flex } from '@rebass/grid'
import SectionTitle from './SectionTitle'
import TextField from './TextField'
import InputMask from './InputMask'
import Button from '@material-ui/core/Button'
import AnimatedBox from './AnimatedBox'
import { withSnackbar } from 'notistack'
import Axios from 'axios'
import PropTypes from 'prop-types'

const ContactForm = ({ enqueueSnackbar, colors }) => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  const onChange = e => {
    e.preventDefault()
    const { id, name, value } = e.target
    const key = id || name

    setData({ ...data, [key]: value })
  }

  const onSubmit = async e => {
    e.preventDefault()
    e.stopPropagation()
    if (Object.keys(data).length < 5) return
    try {
      setLoading(true)
      await Axios.post('/api/contact', data)
      enqueueSnackbar('Contanto enviado com sucesso!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('Algo deu errado. Tente novamente mais tarde.', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatedBox
      delay='0.2'
      py='40px'
      bottom>
      <Box
        mx={['20px', 'auto']}
        p={['20px', '20px 40px']}
        css={{ maxWidth: '500px',
          borderRadius: 20 }}
        bg={colors.secondary}
      >
        <Box mb='40px'>
          <SectionTitle
            fontSize='30px'
            title='Contato'
            color={colors.primary}
          />
        </Box>

        <Flex
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
          as='form'
          onSubmit={onSubmit}
        >
          <Box mb='20px' width='100%'>
            <TextField
              onChange={onChange}
              margin='dense'
              id='name'
              label='Nome'
              fullWidth
            />
          </Box>

          <Box mb='20px' width='100%'>
            <TextField
              onChange={onChange}
              margin='dense'
              id='subjection'
              label='Assunto'
              fullWidth
            />
          </Box>

          <Box mb='20px' width='100%'>
            <InputMask
              onChange={onChange}
              margin='dense'
              id='phone'
              label='Telefone'
              mask='(99) 99999-9999'
              maskChar={null}
              fullWidth
            />
          </Box>

          <Box mb='20px' width='100%'>
            <TextField
              onChange={onChange}
              margin='dense'
              id='email'
              label='E-mail'
              type='email'
              fullWidth
            />
          </Box>

          <Box mb='20px' width='100%' css={{ textarea: { height: 100 } }}>
            <TextField
              onChange={onChange}
              margin='dense'
              id='message'
              label='Mensagem'
              multiline
              fullWidth
            />
          </Box>

          <Box mt='20px'>
            <Button
              variant='contained'
              type='submit'
              disabled={Object.keys(data).length < 5 || loading}
              color='primary'
              size='large'>
                Enviar
            </Button>
          </Box>
        </Flex>
      </Box>
    </AnimatedBox>
  )
}

ContactForm.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  colors: PropTypes.object
}

export default withSnackbar(ContactForm)
