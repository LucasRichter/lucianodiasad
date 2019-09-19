import styled from 'styled-components'
import mediaQueries from '../helpers/mediaQueries'
import React from 'react'
import Anchor from './Anchor'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Flex } from '@rebass/grid'

const Menu = styled.div`
  display: none;
  @media ${mediaQueries.laptop} {
    display: block;
  }
`

const MenuDesktop = ({ links, colors }) =>
  <Menu>
    <Flex
      justifyContent='space-between'
      alignItems='center'
    >
      {links.map(value => (
        <Link key={value._id} href={`/${value.permalink}`}>
          <Anchor color={colors.ternary} p='0 20px'>
            {value.title}
          </Anchor>
        </Link>
      ))}
    </Flex>
  </Menu>

MenuDesktop.propTypes = {
  links: PropTypes.object.isRequired,
  colors: PropTypes.object
}

export default MenuDesktop
