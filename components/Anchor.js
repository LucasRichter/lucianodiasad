import styled, { css } from 'styled-components'
import colors from '../helpers/colors'

export default styled.a`
  color: white;
  padding: ${p => p.p};
  font-size: ${p => p.fontSize || '15px'};
  text-transform: ${p => p.lower ? 'unset' : 'uppercase'};
  font-weight: bold;
  font-family: 'Lato';
  cursor: pointer;
  transition: opacity .125s ease-in-out;

  ${p => p.dark && css`
    color: ${colors.dark};
  `}

  &:hover {
    opacity: .6;
  }
`
