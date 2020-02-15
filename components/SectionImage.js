import React from 'react'
import PropTypes from 'prop-types'
import { Flex, Box } from '@rebass/grid'
import JsxParser from 'react-jsx-parser'
import styled from 'styled-components'
import AnimatedBox from './AnimatedBox'
import SectionTitle from './SectionTitle'
import mediaQueries from '../helpers/mediaQueries'

const Image = styled(Box)`
  background-image: url('${p => p.url}');
  background-size: cover;
  background-position: center;
  position: relative;
  max-width: 100%;
  height: 400px;

  @media ${mediaQueries.laptop} {
    transform: skew(-20deg) translateX(-15%);
    padding: 40px 120px;
    height: 540px;
  }
`

const SectionImage = ({ jsxText, title, colors, image }) => {
  return (
    <Flex
      flexDirection={['column-reverse', 'row']}
      alignItems='center'
      justifyContent='center'
    >
      <AnimatedBox delay='0.5' left mb={[20, 0]}>
        <Image width={['100%', '800px']} url={`/${image.file && image.file.path}`} />
      </AnimatedBox>

      <AnimatedBox
        ml={[20, -20]}
        mr={[20, 80]}
        mt={['20px', 0]}
        bottom
      >
        <Box delay='0.3' mb='40px'>
          <SectionTitle
            fontSize='30px'
            title={title}
            color={colors.secondary}
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
  image: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired
}

export default SectionImage
