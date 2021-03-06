import styled, { css } from 'styled-components'
import colors from '../helpers/colors'

const Text = styled.p.attrs(p => ({ className: 'text-main' }))`
  color: ${p => p.color};
  font-family: 'Lato';
  line-height: ${p => p['lH'] || '1'};
  transition: all .125s ease-in-out;
  font-size: ${p => p['fontSize'] || '15px'};
  text-decoration: none;

  ${({ inline }) => inline && css`
    display: inline;
  `}

  ${({ m }) => m && css`
    margin: ${m};
  `}

  ${({ centered }) => centered && css`
    text-align: center;
  `}

  ${({ left }) => left && css`
    text-align: left;
  `}

  ${({ upper }) => upper && css`
    text-transform: uppercase;
  `}

  ${({ bold }) => bold && css`
    font-weight: bold;
  `}

  ${({ hover }) => hover && css`
    &:hover {
      opacity: 0.5;
    }
  `}

  ${({ ternary }) => ternary && css`
    color: ${colors.ternary};
  `}

  ${({ primary }) => primary && css`
    color: ${colors.primary};
  `}

  ${({ secondary }) => secondary && css`
    color: ${colors.secondary};
  `}

  ${({ opaque }) => opaque && css`
    opacity: 0.6;
  `}

  ${({ wordBreakAll }) => wordBreakAll && css`
    word-break: break-all;
  `}
`

export default Text
