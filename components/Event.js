import React from 'react'
import PropTypes from 'prop-types'
import { H2 } from './Title'
import { Box, Flex } from '@rebass/grid'
import Text from './Text'
import moment from 'moment'
import Link from 'next/link'
import { User, Edit } from 'react-feather'
import Anchor from './Anchor'

const Event = ({ event, onClick, colors }) => {
  const { title, date, limit, permalink } = event
  const momentDate = moment(date)
  return (
    <Flex
      bg={colors.secondary}
      m='20px'
      justifyContent='space-between'
      pr='20px'
      css={{
        maxWidth: '100%',
        overflow: 'visible',
        boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)',
        borderRadius: 8
      }}
    >
      <Box
        p='20px'
        bg={colors.primary}
      >
        <H2 centered fontSize='40px' color={colors.ternary}>{momentDate.format('DD')}</H2>
        <Text fontSize='22px' upper centered color={colors.ternary}>{momentDate.format('MMM')}</Text>
      </Box>

      <Flex
        mr='80px'
        ml='20px'
        flexDirection='column'
        justifyContent='space-between'
        my='20px'
      >
        <Box mb='10px'>
          <Link
            title='Ver detalhes'
            href={`/agenda?id=${permalink}`}
            as={`/agenda/${permalink}`}
          >
            <Anchor color={colors.ternary} lower fontSize='18px'>
              <strong>{title}</strong>
            </Anchor>
          </Link>
        </Box>

        <Flex
          alingItems='center'
          title='Vagas'
        >
          <Box mr='5px'>
            <User color={colors.ternary} />
          </Box>
          <Text color={colors.ternary} as='strong'>
            {limit}
          </Text>
        </Flex>
      </Flex>

      <Flex
        flexDirection='column'
        mt='20px'
      >
        <Box onClick={onClick} css={{
          transition: 'all .125s ease-in-out',
          cursor: 'pointer',
          ':hover': {
            opacity: 0.5
          }
        }}>
          <Edit color={colors.ternary} />
        </Box>
      </Flex>
    </Flex>
  )
}

Event.propTypes = {
  onClick: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired
}

export default Event
