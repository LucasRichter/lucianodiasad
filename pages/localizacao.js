import React, { Component } from 'react'
import PageHead from '../components/PageHead'
import { Box } from '@rebass/grid'
import SectionTitle from '../components/SectionTitle'
import Text from '../components/Text'
import Anchor from '../components/Anchor'
import PropTypes from 'prop-types'

class IndexPage extends Component {
  static propTypes = {
    currentConfig: PropTypes.object
  }

  render () {
    return (
      <main>
        <PageHead
          title='Luciao Dias | Localização'
          description='Localização'
        />

        <Box
          mt='40px'
          p={['20px', '0 120px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Localização'
              white
            />
          </Box>

          <Box css={{ textAlign: 'center' }} mx='auto'>
            <Text color='white'>
              E-mail: <Anchor
                fontSize='12px'
                lower
                href={`mailto:${this.props.currentConfig.contact_email}`}
              >
                {this.props.currentConfig.contact_email}
              </Anchor>
            </Text>
          </Box>

          <Box css={{ textAlign: 'center' }} mx='auto'>
            <Text color='white'>
              Telefone: <Anchor
                fontSize='12px'
                lower
                href={`tel:+555132110067`}
              >
          +55 (51) 32110067
              </Anchor>
            </Text>

          </Box>

          <Box
            my='30px'
            css={{ textAlign: 'center' }}
          >
            <iframe
              src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.2656325969356!2d-51.228004585058216!3d-30.029236237529467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197908b9cb15c3%3A0xed9eb2236630c3af!2sR.+Vig.+Jos%C3%A9+In%C3%A1cio%2C+399+-+Centro+Hist%C3%B3rico%2C+Porto+Alegre+-+RS%2C+90020-110!5e0!3m2!1spt-BR!2sbr!4v1566181535698!5m2!1spt-BR!2sbr'
              style={{
                width: '100%',
                maxWidth: '400px'
              }}
              height='300'
              frameBorder='0'
              allowFullScreen
            />
          </Box>

          <Text centered m='auto' color='white'>
            R. Vigário José Inácio, 399/502 - Centro Histórico - POA - RS.
          </Text>
        </Box>

      </main>
    )
  }
}

export default IndexPage
