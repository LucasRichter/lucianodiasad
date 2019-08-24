import React, { useState } from 'react'
import { Box, Flex } from '@rebass/grid'
import SectionTitle from './SectionTitle'
import TextField from './TextField'
import InputMask from './InputMask'
import Button from '@material-ui/core/Button'
import AnimatedBox from './AnimatedBox'

const ContactForm = () => {
  const [data, setData] = useState({})

  const onChange = e => {
    e.preventDefault()
    const { id, name, value } = e.target
    const key = id || name

    setData({ ...data, [key]: value })
  }

  const onSubmit = () => {}

  return (
    <AnimatedBox delay='0.2' bottom p={['20px', '40px 120px']}>
      <Box mb='40px'>
        <SectionTitle
          white
          fontSize='30px'
          title='Contato'
        />
      </Box>

      <Flex
        alignItems='center'
        justifyContent='center'
        flexDirection='column'
        mx='auto'
        css={{ maxWidth: '500px' }}
      >
        <Box mb='20px' width='100%'>
          <TextField
            white
            autoFocus
            onChange={onChange}
            margin='dense'
            id='name'
            label='Nome'
            fullWidth
          />
        </Box>

        <Box mb='20px' width='100%'>
          <TextField
            white
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
            white
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
            white
            onChange={onChange}
            margin='dense'
            id='message'
            label='Mensagem'
            multiline
            fullWidth
          />
        </Box>

        <Box mt='20px'>
          <Button variant='contained' onClick={onSubmit} color='primary' size='large'>
                Enviar
          </Button>
        </Box>
      </Flex>
    </AnimatedBox>
  )
}

export default ContactForm
