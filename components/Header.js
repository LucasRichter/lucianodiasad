import React from 'react'
import styled from 'styled-components'
import MenuMobile from './MenuMobile'
import Link from 'next/link'
import mediaQueries from '../helpers/mediaQueries'
import Menudesktop from './MenuDesktop'
import { Box } from '@rebass/grid'
import Logo from './Logo'
import PropTypes from 'prop-types'
import SocialMedias from './SocialLinks'

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: center;
  padding: 20px 20px 0;

  @media ${mediaQueries.laptop} {
    padding: 20px 120px;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    align-items: center;
    white-space: nowrap;
    width: 100%;
  }
`

const links = {
  escritorio: 'Escritório',
  contato: 'Contato',
  localizacao: 'Localização'
}

const Header = ({ currentConfig }) => (
  <StyledHeader>
    <MenuMobile socialLinks={currentConfig} links={links} />

    <Box
      my='20px'
      mx='auto'
    >
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
    </Box>

    <SocialMedias socialLinks={currentConfig} />

    <Menudesktop links={links} />
  </StyledHeader>
)

Header.propTypes = {
  currentConfig: PropTypes.object
}

export default Header
