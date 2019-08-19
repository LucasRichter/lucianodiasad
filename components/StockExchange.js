import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@rebass/grid'
import Text from './Text'
import colors from '../helpers/colors'
import styled, { keyframes } from 'styled-components'

const move = keyframes`
  0%{transform: translateX(-50%)}
  100%{transform: translateX(100%)}
`

const Banner = styled(Flex)`
  animation: ${move} 15s linear infinite;
`

const StockExchange = ({ stocks }) => {
  return (
    <Box
      bg='#fdf1f2'
      p='20px'
      css={{
        overflow: 'hidden'
      }}
    >
      <Banner
      >
        {Object.entries(stocks).map(([ key, value ]) => (
          <Flex
            key={key}
            alignItems='center'
            mx='30px'
          >
            <Text>
              {key}
            </Text>

            <Text bold color={value.variation < 0 ? colors.error : colors.success}>
              ({value.variation}%)
            </Text>
          </Flex>
        ))}
      </Banner>
    </Box>
  )
}

StockExchange.propTypes = {
  stocks: PropTypes.object.isRequired
}

export default StockExchange
