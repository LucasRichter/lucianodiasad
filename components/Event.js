import React from 'react'
import PropTypes from 'prop-types'
import { H2 } from './Title'
import { Box, Flex } from '@rebass/grid'
import Text from './Text'
import moment from 'moment'
import Link from 'next/link'
import { User, Edit } from 'react-feather'
import Anchor from './Anchor'

const Event = ({ event }) => {
  const { title, date, limit, permalink } = event
  const momentDate = moment(date)
  return (
    <Flex
      bg='white'
      m='20px'
      justifyContent='space-between'
      pr='20px'
      css={{
        overflow: 'visible',
        boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)',
        borderRadius: 8,
        transition: 'all .125s ease-in-out',
        ':hover': {
        }
      }}
    >
      <Box
        p='20px'
        bg='#ff0000'
      >
        <H2 centered fontSize='40px' color='white'>{momentDate.format('DD')}</H2>
        <Text fontSize='22px' upper centered color='white'>{momentDate.format('MMM')}</Text>
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
            <Anchor dark lower fontSize='18px'>
              <strong>{title}</strong>
            </Anchor>
          </Link>
        </Box>

        <Flex
          alingItems='center'
          title='Vagas'
        >
          <Box mr='5px'>
            <User />
          </Box>
          <Text as='strong'>
            {limit}
          </Text>
        </Flex>
      </Flex>

      <Flex
        flexDirection='column'
        mt='20px'
      >
        <Box p='5px' css={{
          transition: 'all .125s ease-in-out',
          cursor: 'pointer',
          ':hover': {
            opacity: 0.5
          }
        }}>
          <Edit />
        </Box>
      </Flex>
    </Flex>
  )
}

Event.propTypes = {
  event: PropTypes.object.isRequired
}

export default Event
