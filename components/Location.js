import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@rebass/grid'
import SectionTitle from './SectionTitle'
import Text from './Text'
import Anchor from './Anchor'
import AnimatedBox from './AnimatedBox'
import { Mail, MapPin, Phone } from 'react-feather'

const Location = ({ email, colors }) => {
  return (
    <Flex
      justifyContent={['center', 'space-between']}
      alignItems='center'
      flexWrap='wrap'
      p={['20px', '40px 120px']}
    >
      <AnimatedBox top delay='0.1'>
        <Box mb='40px'>
          <SectionTitle
            fontSize='30px'
            title='Localização'
            color={colors.ternary}
          />
        </Box>

        <Flex mb='30px'>
          <Mail color={colors.ternary} />
          <Box ml='10px'>
            <Text as='strong' ternary>
              E-mail:
            </Text>
            <Box>
              <Anchor lower color={colors.primary} href={`mailto:${email}`}>{email}</Anchor>
            </Box>
          </Box>

        </Flex>

        <Flex mb='30px'>
          <MapPin color={colors.ternary} />
          <Box ml='10px'>
            <Text as='strong' ternary>
                Localização:
            </Text>
            <Text opaque color={colors.primary}>
                R. Vigário José Inácio, 399/502
            </Text>
            <Text opaque color={colors.primary}>
                Centro Histórico
            </Text>
            <Text opaque color={colors.primary}>
                Porto Alegre
            </Text>
            <Text opaque color={colors.primary}>
                Rio Grande do Sul
            </Text>
          </Box>
        </Flex>

        <Flex mb='30px'>
          <Phone color={colors.ternary} />
          <Box ml='10px'>
            <Text as='strong' ternary>
              Telefone:
            </Text>
            <Box>
              <Anchor color={colors.primary} lower href={`tel:+555132110067`}>+55 (51) 32110067</Anchor>
            </Box>
          </Box>
        </Flex>
      </AnimatedBox>

      <AnimatedBox width={['auto', '600px']} right delay='0.3'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.2656325969356!2d-51.228004585058216!3d-30.029236237529467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197908b9cb15c3%3A0xed9eb2236630c3af!2sR.+Vig.+Jos%C3%A9+In%C3%A1cio%2C+399+-+Centro+Hist%C3%B3rico%2C+Porto+Alegre+-+RS%2C+90020-110!5e0!3m2!1spt-BR!2sbr!4v1566181535698!5m2!1spt-BR!2sbr'
          style={{
            width: '100%'
          }}
          height='450'
          frameBorder='0'
          allowFullScreen
        />
      </AnimatedBox>
    </Flex>
  )
}

Location.propTypes = {
  email: PropTypes.string.isRequired,
  colors: PropTypes.object
}

export default Location
