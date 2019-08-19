import styled from 'styled-components'

export default styled.a`
  color: white;
  padding: ${p => p.p};
  font-size: ${p => p.fontSize || '15px'};
  text-transform: ${p => p.lower ? 'unset' : 'uppercase'};
  font-weight: bold;
  font-family: 'Work Sans';
  cursor: pointer;
  transition: opacity .125s ease-in-out;

  &:hover {
    opacity: .6;
  }
`
