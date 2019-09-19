import styled, { css } from 'styled-components'
import colors from '../helpers/colors'

export default styled.a`
  color: ${p => p.color};
  padding: ${p => p.p};
  font-size: ${p => p.fontSize || '15px'};
  text-transform: ${p => p.lower ? 'unset' : 'uppercase'};
  font-weight: bold;
  font-family: 'Lato';
  cursor: pointer;
  transition: opacity .125s ease-in-out;

  ${p => p.ternary && css`
    color: ${colors.ternary};
  `}

  ${p => p.primary && css`
    color: ${colors.primary};
  `}

  &:hover {
    opacity: .6;
  }
`
