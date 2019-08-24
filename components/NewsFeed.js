import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import styled from 'styled-components'
import Text from './Text'
import { Box, Flex } from '@rebass/grid'
import { H2, H3 } from './Title'

const StyledSlider = styled(Slider)`
  border-radius: 4px;
  box-shadow: 9px 14px 17px 0px rgba(0,0,0,0.71);
  max-width: 500px;
  background: white;
`

var settings = {
  dots: false,
  infinite: true,
  adaptiveHeight: true,
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
      content = [...content, (
        <Flex
          alignItems='center'
          p='20px'
          jutifyContent='center'
        >
          <H2 centered>{value.title}</H2>
          {value.items.map((item, index) => (
            <Flex
              mt='20px'
              pb='10px'
              css={{ borderBottom: '1px solid #893530' }}
            >
              <Box mr='10px'>
                <H3 color='#893530' small>0{index + 1}</H3>
              </Box>

              <Text
                fontSize='17px'
                as='a'
                color='#893530'
                href={item.link}
                target='_blank'
                bold>
                {item.title}
              </Text>
            </Flex>
          ))}
        </Flex>
      )]
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
