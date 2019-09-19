import styled from 'styled-components'
import Logo from './Logo'
import Text from './Text'
import React from 'react'
import mediaQueries from '../helpers/mediaQueries'
import Link from 'next/link'
import SocialMedias from './SocialLinks'
import AnimatedBox from './AnimatedBox'
import PropTypes from 'prop-types'

const StyledFooter = styled(AnimatedBox)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  padding: 0 20px 20px;
  background-color: ${p => p.bg};

  @media ${mediaQueries.laptop} {
    padding: 40px 120px;
  }
`

const Footer = ({ colors }) =>
  <StyledFooter bg={colors.secondary} as='footer' delay='0.3' left>
    <Link href='/'>
      <a>
        <Logo />
      </a>
    </Link>

    <SocialMedias />

    <Text color={colors.ternary}>
      © 2019 Luciano Dias, Todos os direitos reservados
    </Text>
  </StyledFooter>

Footer.propTypes = {
  colors: PropTypes.object
}

export default Footer
