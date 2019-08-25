import styled from 'styled-components'
import Logo from './Logo'
import Text from './Text'
import React from 'react'
import mediaQueries from '../helpers/mediaQueries'
import Link from 'next/link'
import SocialMedias from './SocialLinks'

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 20px 20px;
  background-color: white;

  @media ${mediaQueries.laptop} {
    padding: 40px 120px;
  }
`

const Footer = () =>
  <StyledFooter>
    <Link href='/'>
      <a>
        <Logo />
      </a>
    </Link>

    <SocialMedias />

    <Text>
      © 2019 Luciano Dias, Todos os direitos reservados
    </Text>
  </StyledFooter>

export default Footer
