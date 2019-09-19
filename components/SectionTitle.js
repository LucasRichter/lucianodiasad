import React, { Component } from 'react'
import styled from 'styled-components'
import TrackVisibility from 'react-on-screen'
import PropTypes from 'prop-types'
import { H2 } from './Title'
import colors from '../helpers/colors'

const StyledTitle = styled(H2)`
  align-items: center;
  font-size: 30px;
  text-align: center;
  color: ${p =>
    p.secondary
      ? colors.secondary
      : p.blueLight
        ? colors.blueLight
        : p.sea
          ? colors.sea
          : p.ternary
            ? colors.ternary
            : p.white
              ? '#fff'
              : p.color};
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
