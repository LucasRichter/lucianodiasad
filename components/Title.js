import styled, { css } from 'styled-components'

const centered = ({ centered }) => centered && css`text-align: center;`
const inline = ({ inline }) => inline && css`display: inline-block;`
const color = ({ color }) => color && css`color: ${color};`
const weight = ({ weight }) => weight && css`font-weight: ${weight};`

export const H1 = styled.h1`
  margin: 0;
  font-family: Rubik;
  font-weight: 400;
  font-size: 40px;
  text-align: left;

  ${centered}
  ${inline}
  ${color}
  ${weight}
`

export const H2 = styled.h2`
  margin: 0;
  font-family: Rubik;
  font-weight: 400;
  font-size: ${p => p.fontSize || '20px'};
  text-align: left;
  
  ${centered}
  ${inline}
  ${color}
  ${weight}
`

export const H3 = styled.h3`
  margin: 0;
  font-family: Karla;
  font-weight: 400;
  font-size: 26px;
  text-align: left;

  ${p => p.small && css`
    font-size: 16px;
  `}

  ${centered}
  ${inline}
  ${color}
  ${weight}
`

export const H4 = styled.h4`
  margin: 0;
  font-family: Karla;
  font-weight: 400;
  font-size: 26px;
  text-align: left;

  ${centered}
  ${inline}
  ${color}
  ${weight}
`
