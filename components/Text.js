import styled, { css } from 'styled-components'
import colors from '../helpers/colors'

const Text = styled.p`
  color: ${p => p.color};
  font-family: 'Karla';
  line-height: ${p => p['lH'] || '1'};
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

  ${({ bold }) => bold && css`
    font-weight: bold;
  `}

  ${({ dark }) => dark && css`
    color: ${colors.dark};
  `}


  ${({ opaque }) => opaque && css`
    opacity: 0.6;
  `}

  ${({ wordBreakAll }) => wordBreakAll && css`
    word-break: break-all;
  `}
`

export default Text
