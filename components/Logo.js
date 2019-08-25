import styled from 'styled-components'
import React from 'react'
import mediaQueries from '../helpers/mediaQueries'

const StyledLogo = styled.img`
  margin: ${p => p.m};
  cursor: pointer;
  max-width: 200px;
  transition: transform .125s ease-in-out;
  transform: scale(1);

  @media ${mediaQueries.laptop} {
    max-width: 250px;
  }

  :hover {
    transform: scale(1.1);
  }
`

const Logo = () =>
  <StyledLogo src='/static/logo.png' alt='Logo' />

export default Logo
