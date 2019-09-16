import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from '@rebass/grid'
import Text from './Text'
import colors from '../helpers/colors'

const StockExchange = ({ stocks }) => {
  return (
    <Box
      bg={colors.jet}
      p='20px'
      css={{
        overflow: 'hidden'
      }}
    >
      <Flex
        justifyContent='space-between'
        alignItems='center'
      >
        {Object.entries(stocks).map(([ key, value ], index) => (
          <Flex
            key={key}
            alignItems='center'
            mx='30px'
          >
            <Text dark>
              {key} <Text as='strong' color={value.variation < 0 ? colors.error : colors.success}>
                {value.variation}%
              </Text>
            </Text>

          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

StockExchange.propTypes = {
  stocks: PropTypes.object
}

StockExchange.defaultProps = {
  stocks: {}
}

export default StockExchange
