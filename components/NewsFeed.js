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
  min-height: 540px;
  background: ${p => p.bg};
`

var settings = {
  dots: false,
  infinite: true,
  adaptiveHeight: true,
  lazyLoad: 'ondemand',
  fade: true,
  autoplay: true,
  speed: 1500,
  slidesToShow: 1,
  id: 'teste2',
  slidesToScroll: 1
}

const NewsFeed = ({ news, colors }) => {
  const getContent = news => {
    let content = []
    for (let value of news) {
      content = [...content, (
        <Flex
          alignItems='center'
          p='20px'
          jutifyContent='center'
        >
          <H2 color={colors.ternary} centered>{value.title}</H2>
          {value.items.map((item, index) => (
            <Flex
              mt='20px'
              css={{ borderBottom: `1px solid ${colors.primary}` }}
              pb='10px'
            >
              <Box mr='10px'>
                <H3 color={colors.ternary} small>0{index + 1}</H3>
              </Box>

              <Text
                fontSize='17px'
                as='a'
                color={colors.ternary}
                href={item.link}
                target='_blank'
                bold
                hover>
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
    <StyledSlider bg={colors.secondary} {...settings}>
      {getContent(news)}
    </StyledSlider>
  )
}

NewsFeed.propTypes = {
  news: PropTypes.array.isRequired,
  colors: PropTypes.object
}

export default NewsFeed
