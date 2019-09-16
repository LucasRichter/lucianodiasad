import React from 'react'
import styled from 'styled-components'
import MenuMobile from './MenuMobile'
import Link from 'next/link'
import mediaQueries from '../helpers/mediaQueries'
import Menudesktop from './MenuDesktop'
import { Box } from '@rebass/grid'
import Logo from './Logo'
import PropTypes from 'prop-types'
import AnimatedBox from './AnimatedBox'
import colors from '../helpers/colors'

const StyledHeader = styled(AnimatedBox)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: center;
  padding: 20px 20px 0;

  @media ${mediaQueries.laptop} {
    padding: 20px 120px;
    justify-content: space-between;
    background-color: ${colors.jet};
    box-sizing: border-box;
    align-items: center;
    white-space: nowrap;
    box-shadow: 9px 14px 17px 0px rgba(0,0,0,0.71);
    width: 100%;
  }
`

const links = {
  escritorio: 'Escritório',
  contato: 'Contato',
  localizacao: 'Localização'
}

const Header = ({ currentConfig }) => (
  <StyledHeader as='header' bottom delay='1'>
    <MenuMobile socialLinks={currentConfig} links={links} />

    <Box >
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
    </Box>

    <Menudesktop links={links} />
  </StyledHeader>
)

Header.propTypes = {
  currentConfig: PropTypes.object
}

export default Header
