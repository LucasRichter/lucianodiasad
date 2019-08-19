import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import styled from 'styled-components'
import Text from './Text'
import { Box, Flex } from '@rebass/grid'
import { H2 } from './Title'

const StyledSlider = styled(Slider)`
  background-image: url('/static/news.jpg');
  background-size: cover;
  background-position: center;
`

const Slide = styled(Flex)`
  position: relative;
  min-height: 400px;
  border-radius: 4px;
  width: 100%;
`

var settings = {
  dots: false,
  infinite: true,
  lazyLoad: 'ondemand',
  fade: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
}

const NewsFeed = ({ news }) => {
  const getContent = news => {
    let content = []
    for (let value of news) {
      for (let item of value.items) {
        content = [...content, (
          <Slide
            flexDirection='column-reverse'
            alignItems='stretch'
            jutifyContent='flex-end'
          >
            <Box p='20px' mt='auto' css={{
              display: 'inline-block',
              position: 'absolute',
              bottom: 0,
              left: 0
            }}>
              <H2 fontSize='17px' as='a' href={item.link} target='_blank' bold color='white'>
                {item.title}
              </H2>
              <Text fontSize='14px' color='white'>
                Fonte: <Text as='a' fontSize='14px' color='white' href={value.link} target='_blank'>{value.title}</Text>
              </Text>
            </Box>
          </Slide>
        )]
      }
    }
    return content
  }
  return (
    <StyledSlider {...settings}>
      {getContent(news)}
    </StyledSlider>
  )
}

NewsFeed.propTypes = {
  news: PropTypes.array.isRequired
}

export default NewsFeed
