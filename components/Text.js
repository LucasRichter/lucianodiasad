import styled, { css } from 'styled-components'

const Text = styled.p`
  color: ${p => p.color};
  font-family: 'Work Sans';
  line-height: ${p => p['lH'] || '1'};
  font-size: ${p => p['fontSize'] || '15px'};

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

  ${({ opaque }) => opaque && css`
    opacity: 0.6;
  `}

  ${({ wordBreakAll }) => wordBreakAll && css`
    word-break: break-all;
  `}
`

export default Text
