import React, { Component } from 'react'
import PageHead from '../components/PageHead'
import { Box, Flex } from '@rebass/grid'
import SectionTitle from '../components/SectionTitle'
import JsxParser from 'react-jsx-parser'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getHomeImage } from '../services/homeServices'

const Image = styled.div`
  background-image: url('${p => p.url}');
  background-size: cover;
  background-position: center;
  width: 400px;
  max-width: 100%;
  height: 400px;
`

class IndexPage extends Component {
  static propTypes = {
    currentConfig: PropTypes.object,
    image: PropTypes.object
  }

  static defaultProps = {
    image: { file: {} }
  }

  static async getInitialProps ({ currentConfig }) {
    const image = await getHomeImage()
    return { image }
  }

  render () {
    const { currentConfig, image } = this.props
    return (
      <main>
        <PageHead
          title='Luciano Dias | Escritório'
          description='A Casa'
        />

        <Box
          css={{ backgroundColor: 'white' }}
          p={['20px', '40px 120px']}
        >
          <Box mb='40px'>
            <SectionTitle
              title='Escritório'
              dark
            />
          </Box>

          <Flex flexDirection={['column', 'row']}>

            <Box mb={['20px', '']}>
              <Image url={image && `/${image.file.path}`} />
            </Box>

            <Box ml='20px' >
              <JsxParser
                jsx={currentConfig.home_text}
              />
            </Box>
          </Flex>

        </Box>

      </main>
    )
  }
}

export default IndexPage
