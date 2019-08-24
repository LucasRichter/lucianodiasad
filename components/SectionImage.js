import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from '@rebass/grid'
import JsxParser from 'react-jsx-parser'
import styled from 'styled-components'
import AnimatedBox from './AnimatedBox'
import SectionTitle from './SectionTitle'

const Image = styled.div`
  background-image: url('${p => p.url}');
  background-size: cover;
  background-position: center;
  width: 800px;
  position: relative;
  transform: skew(-20deg) translateX(-15%);
  max-width: 100%;
  height: 540px;
`

const SectionImage = ({ jsxText, title, image }) => {
  return (
    <Flex
      flexDirection={['column', 'row']}
      alignItems='center'
      justifyContent='center'
    >
      <AnimatedBox delay='0.5' left mb={[20, 0]}>
        <Image url={`/${image?.file.path}`} />
      </AnimatedBox>

      <AnimatedBox
        ml={[0, -20]}
        mr={[0, 80]}
        bottom
      >
        <Box delay='0.3' mb='40px'>
          <SectionTitle
            fontSize='30px'
            title={title}
            dark
          />
        </Box>
        <JsxParser
          jsx={jsxText}
        />
      </AnimatedBox>
    </Flex>
  )
}

SectionImage.propTypes = {
  jsxText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.object.isRequired
}

export default SectionImage
