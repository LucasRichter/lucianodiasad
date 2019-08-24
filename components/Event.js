import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { H2 } from './Title'
import { Box } from '@rebass/grid'
import Text from './Text'
import moment from 'moment'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import mediaQueries from '../helpers/mediaQueries'

const Container = styled(Box)`
  @media ${mediaQueries.laptop} {
    white-space: nowrap;
  }
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  flex-grow: 1;
  max-width: 242px;
  flex-basis: 0;
  transition: all .300s ease-in;
`

const Image = styled.img`
  width: 100%;
  max-height: 400px;
`

const EventMain = styled.div`
  cursor: pointer;
  transition: all .125s ease-in-out;

  :hover {
    opacity: .5;
    transform: scale(1.05);
  }
`

export default class Event extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired
  }

  render() {
    const { event } = this.props
    const { title, date, cover, permalink } = event

    return (
      <Container
        my='5px'
        px='2.5px'
      >
        <Link
          href={`/agenda?id=${permalink}`}
          as={`/agenda/${permalink}`}
        >
          <EventMain>
            <H2 centered fontSize='15px' color='white'>
              <strong>{title.toUpperCase()}</strong>
            </H2>

            <Box mb='20px' css={{
              textTransform: 'uppercase',
              opacity: '0.8'
            }}>
              <Text
                fontSize='12px'
                color='white'
              >
                {moment(date).format('dddd, DD.MM.YYYY')}
              </Text>
            </Box>
            <Image
              src={`/${cover.path}`}
              alt={title}
            />
          </EventMain>

        </Link>

        <Box mt='20px' width='100%'>
          <Button href={`/lista/${permalink}`} fullWidth variant='contained' color='primary' size='large'>
            Inscreva-se
          </Button>
        </Box>

      </Container>
    )
  }
}
