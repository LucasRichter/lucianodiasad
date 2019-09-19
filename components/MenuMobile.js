import styled from 'styled-components'
import mediaQueries from '../helpers/mediaQueries'
import React from 'react'
import Anchor from './Anchor'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Twitter, Instagram, Facebook } from 'react-feather'
import { Box, Flex } from '@rebass/grid'

const MenuToggle = styled.div`
  @media ${mediaQueries.laptop} {
    display: none;
  }

  display: block;
  position: relative;
  top: 25px;
  left: 25px;
  
  z-index: 1;
  
  user-select: none;

  input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;
    
    cursor: pointer;
    
    opacity: 0; /* hide this */
    z-index: 2; /* and place it over the hamburger */
    
    -webkit-touch-callout: none;
  }

  span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    
    background: white;
    border-radius: 3px;
    
    z-index: 1;
    
    transform-origin: 4px 0px;
    
    transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                opacity 0.55s ease;
  }

  span:first-child {
    transform-origin: 0% 0%;
  }

  span:nth-last-child(2)
  {
    transform-origin: 0% 100%;
  }

  input:checked ~ span
  {
    opacity: 1;
    transform: rotate(45deg) translate(-2px, -1px);
    background: white;
  }

  input:checked ~ span:nth-last-child(3)
  {
    opacity: 0;
    transform: rotate(0deg) scale(0.2, 0.2);
  }

  input:checked ~ span:nth-last-child(2)
  {
    transform: rotate(-45deg) translate(0, -1px);
  }

  input:checked ~ ul
{
  transform: none;
}
`

const MenuList = styled.ul`
  position: absolute;
  margin: -100px 0 0 -50px;
  padding: 50px;
  padding-top: 125px;
  height: 100vh;
  background: ${p => p.bg};
  list-style-type: none;
  -webkit-font-smoothing: antialiased;
  /* to stop flickering of text in safari */
  
  transform-origin: 0% 0%;
  transform: translate(-100%, 0);
  
  transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);

  li
  {
    text-align: left;
    padding: 10px 0;
    font-size: 22px;
  }
`

export default class MenuMobile extends React.Component {
  static propTypes = {
    links: PropTypes.array.isRequired,
    colors: PropTypes.object,
    socialLinks: PropTypes.object
  }

  static defaultProps = {
    socialLinks: {}
  }

  state = {
    open: false
  }

  render() {
    const { links, socialLinks: asLink, colors } = this.props
    const socialLinks = asLink || {}
    return (

      <MenuToggle>
        <input name='menu' onChange={() => this.setState(p => ({ open: !p.open }))} checked={this.state.open} type='checkbox' />
        <span />
        <span />
        <span />

        <MenuList bg={colors.ternary}>
          {links.map(value => (
            <Link key={value._id} href={`/${value.permalink}`}>
              <Anchor color={colors.primary} onClick={() => this.setState(p => ({ open: false }))}>
                <li>
                  {value.title}
                </li>
              </Anchor>
            </Link>
          ))}

          <Flex pt='20px' mt='20px' css={{ borderTop: '1px solid white' }}>
            <Box mr='20px'>
              <a href={socialLinks.twitter} target='_blank'>
                <Twitter color={colors.primary} />
              </a>
            </Box>
            <Box mr='20px'>
              <a href={socialLinks.instagram} target='_blank'>
                <Instagram color={colors.primary} />
              </a>
            </Box>
            <Box>
              <a href={socialLinks.facebook} target='_blank'>
                <Facebook color={colors.primary} />
              </a>
            </Box>
          </Flex>
        </MenuList>
      </MenuToggle>
    )
  }
}
