import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@rebass/grid'
import Text from './Text'
import styled, { keyframes } from 'styled-components'

const move = keyframes`
  0%{transform: translateX(-50%)}
  100%{transform: translateX(100%)}
`

const Banner = styled(Flex)`
  animation: ${move} 15s linear infinite;
`

const StockExchange = ({ stocks, colors }) => {
  return (
    <Box
      bg={colors.secondary}
      p='20px'
      css={{
        overflow: 'hidden'
      }}
    >
      <Banner
        justifyContent='space-between'
        alignItems='center'
      >
        {Object.entries(stocks).map(([ key, value ], index) => (
          <Flex
            key={key}
            alignItems='center'
            mx='30px'
          >
            <Text color={colors.primary}>
              {key}
            </Text>

            <Text bold color={value.variation < 0 ? '#D8000C' : '4BB543'}>
        ({value.variation}%)
            </Text>
          </Flex>
        ))}
      </Banner>
    </Box>
  )
}

StockExchange.propTypes = {
  colors: PropTypes.object,
  stocks: PropTypes.object
}

StockExchange.defaultProps = {
  stocks: {}
}

export default StockExchange
