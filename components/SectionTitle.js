import React, { Component } from 'react'
import styled from 'styled-components'
import TrackVisibility from 'react-on-screen'
import PropTypes from 'prop-types'
import { H2 } from './Title'
import colors from '../helpers/colors'

const StyledTitle = styled(H2)`
  align-items: center;
  color: ${p =>
    p.purple
      ? colors.purple
      : p.blueLight
        ? colors.blueLight
        : p.sea
          ? colors.sea
          : p.dark
            ? colors.dark
            : p.white
              ? '#fff'
              : '#292929'};
`

export default class SectionTitle extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    return (
      <TrackVisibility once>
        <StyledTitle centered {...this.props}>
          {this.props.title}
        </StyledTitle>
      </TrackVisibility>
    )
  }
}