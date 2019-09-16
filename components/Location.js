import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@rebass/grid'
import SectionTitle from './SectionTitle'
import Text from './Text'
import Anchor from './Anchor'
import AnimatedBox from './AnimatedBox'
import { Mail, MapPin, Phone } from 'react-feather'
import colors from '../helpers/colors'

const Location = ({ email }) => {
  return (
    <Flex
      justifyContent='space-between'
      p={['20px', '40px 120px']}
    >
      <AnimatedBox top delay='0.1'>
        <Box mb='40px'>
          <SectionTitle
            fontSize='30px'
            title='Localização'
            dark
          />
        </Box>

        <Flex mb='30px'>
          <Mail color={colors.dark} />
          <Box ml='10px'>
            <Text as='strong' dark>
              E-mail:
            </Text>
            <Box>
              <Anchor lower gold href={`mailto:${email}`}>{email}</Anchor>
            </Box>
          </Box>

        </Flex>

        <Flex mb='30px'>
          <MapPin color={colors.dark} />
          <Box ml='10px'>
            <Text as='strong' dark>
                Localização:
            </Text>
            <Text opaque gold>
                R. Vigário José Inácio, 399/502
            </Text>
            <Text opaque gold>
                Centro Histórico
            </Text>
            <Text opaque gold>
                Porto Alegre
            </Text>
            <Text opaque gold>
                Rio Grande do Sul
            </Text>
          </Box>
        </Flex>

        <Flex mb='30px'>
          <Phone color={colors.dark} />
          <Box ml='10px'>
            <Text as='strong' dark>
              Telefone:
            </Text>
            <Box>
              <Anchor gold lower href={`tel:+555132110067`}>+55 (51) 32110067</Anchor>
            </Box>
          </Box>
        </Flex>
      </AnimatedBox>

      <AnimatedBox width='600px' right delay='0.3'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.2656325969356!2d-51.228004585058216!3d-30.029236237529467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197908b9cb15c3%3A0xed9eb2236630c3af!2sR.+Vig.+Jos%C3%A9+In%C3%A1cio%2C+399+-+Centro+Hist%C3%B3rico%2C+Porto+Alegre+-+RS%2C+90020-110!5e0!3m2!1spt-BR!2sbr!4v1566181535698!5m2!1spt-BR!2sbr'
          style={{
            width: '100%'
          }}
          width='600'
          height='450'
          frameBorder='0'
          allowFullScreen
        />
      </AnimatedBox>
    </Flex>
  )
}

Location.propTypes = {
  email: PropTypes.string.isRequired
}

export default Location
