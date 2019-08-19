import styled from 'styled-components'
import Logo from './Logo'
import Text from './Text'
import React from 'react'
import mediaQueries from '../helpers/mediaQueries'
import Link from 'next/link'

const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 0 20px 20px;

  @media ${mediaQueries.laptop} {
    padding: 40px 120px 80px;
  }
`

const Footer = () =>
  <StyledFooter>
    <Link href='/'>
      <a>
        <Logo />
      </a>
    </Link>

    <Text color='white'>
      © 2019 Luciano Dias, Todos os direitos reservados
    </Text>
  </StyledFooter>

export default Footer
