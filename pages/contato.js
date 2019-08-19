import React, { useState } from 'react'
import PageHead from '../components/PageHead'
import { Box, Flex } from '@rebass/grid'
import SectionTitle from '../components/SectionTitle'
import TextField from '../components/TextField'
import InputMask from '../components/InputMask'
import Button from '@material-ui/core/Button'

const IndexPage = () => {
  const [data, setData] = useState({})

  const onChange = e => {
    e.preventDefault()
    const { id, name, value } = e.target
    const key = id || name

    setData({ ...data, [key]: value })
  }

  const onSubmit = () => {}

  return (
    <main>
      <PageHead
        title='Luciano Dias | Contato'
        description='Luciano Dias'
      />

      <Box
        css={{ backgroundColor: 'white' }}
        p={['20px', '40px 120px']}
      >
        <Box mb='40px'>
          <SectionTitle
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
              autoFocus
              margin='dense'
              id='email'
              label='E-mail'
              type='email'
              fullWidth
            />
          </Box>

          <Box mb='20px' width='100%'>
            <TextField
              onChange={onChange}
              margin='dense'
              id='company_name'
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

      </Box>

    </main>
  )
}

export default IndexPage
