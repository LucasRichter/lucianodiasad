import styled from 'styled-components'
import React from 'react'
import { Twitter, Instagram, Facebook } from 'react-feather'
import { Flex, Box } from '@rebass/grid'
import PropTypes from 'prop-types'
import colors from '../helpers/colors'

const StyledSocial = styled(Flex)`
  margin: 0 0 20px;
`

const SocialMedias = ({ socialLinks }) =>
  <StyledSocial
    alignItem='center'
    flexWrap='wrap'
    justifyContent='center'
  >
    <Box mr='20px'>
      <a href={socialLinks && socialLinks.twitter} target='_blank'>
        <Twitter color={colors.gold} />
      </a>
    </Box>
    <Box mr='20px'>
      <a href={socialLinks && socialLinks.instagram} target='_blank'>
        <Instagram color={colors.gold} />
      </a>
    </Box>
    <Box mr='20px'>
      <a href={socialLinks && socialLinks.facebook} target='_blank'>
        <Facebook color={colors.gold} />
      </a>
    </Box>
  </StyledSocial>

SocialMedias.propTypes = {
  socialLinks: PropTypes.object
}

SocialMedias.defaultProps = {
  socialLinks: {}
}

export default SocialMedias
