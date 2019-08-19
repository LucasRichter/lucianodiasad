import React from 'react'
import { Box } from '@rebass/grid'
import TrackVisibility from 'react-on-screen'
import styled, { css } from 'styled-components'

const Image = styled(Box)`
  height: 320px;
  width: 320px;
  max-width: 100%;
  background-image: url(${p => p.url});
  background-size: cover;
  background-position: center;
  transition: all .125s ease-in-out;
  transform: translateY(20%);
  opacity: 0;
  transition-delay:  ${p => p.number * 0.10}s;

  ${p => p.isVisible && css`
    opacity: 1;
    transform: translateY(0);
  `}
`

const InstaImage = props =>
  <TrackVisibility className='track-visibility' once>
    <Image {...props} />
  </TrackVisibility>

export default InstaImage
