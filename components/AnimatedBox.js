import TrackVisibility from 'react-on-screen'

import styled, { css } from 'styled-components'
import { Box } from '@rebass/grid'
import React from 'react'

const Animate = styled(Box)`
  ${p => p.left && css`
    transform: translateX(-20px);
  `}

  ${p => p.right && css`
    transform: translateX(20px);
  `}

  ${p => p.top && css`
    transform: translateY(-20px);
  `}

  ${p => p.bottom && css`
    transform: translateY(20px);
  `}

  opacity: 0;
  transition: all .6s ease-in-out;
  transition-delay: ${p => p.delay}s;

  ${p => p.isVisible && css`
    opacity: 1;
    transform: translateX(0) translateY(0);
  `}
`

const AnimatedBox = props =>
  <TrackVisibility
    once
    partialVisibility
  >
    {({isVisible}) =>
      <Animate
        {...props}
        isVisible={isVisible}
      />
    }
  </TrackVisibility>

export default AnimatedBox
