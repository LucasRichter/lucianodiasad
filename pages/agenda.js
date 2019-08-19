import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import { Flex, Box } from '@rebass/grid'
import Button from '@material-ui/core/Button'
import Axios from 'axios'
import JsxParser from 'react-jsx-parser'
import SectionTitle from '../components/SectionTitle'
import styled from 'styled-components'
import GuestForm from '../components/GuestForm'
import {
  TwitterShareButton,
  TwitterIcon
} from 'react-share'
import moment from 'moment'

const Image = styled.img`
  max-width: 433px;
  width: 100%;
`

class Agenda extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired,
    currentConfig: PropTypes.object.isRequired
  }

  static defaultProps = {
    event: []
  }

  state = {
    open: false
  }

  static async getInitialProps ({ query: { id } }) {
    const res = await Axios.get('/api/events?permalink=' + id)
    return { event: res.data[0] }
  }

  render () {
    const { event, currentConfig } = this.props
    const { _id, party, description, cover, permalink, edition, lists, guests, date } = event

    return (
      <main>
        <PageHead
          title={`Luciano Dias | ${party}`}
        />

        <Flex
          css={{ backgroundColor: 'white' }}
          p={['20px', '40px 120px']}
          flexDirection={['column', 'row']}
        >
          <Box
            width='100%'
            css={{
              maxWidth: 433
            }}
          >
            <Image
              src={`/${cover.path}`}
              alt={party}
            />
            <Box mt='20px' width='100%'>
              <Button onClick={() => this.setState({ open: true })} disabled={!guests} fullWidth color='secondary' variant='contained' size='large'>
                {guests ? 'Nome na lista' : 'Nome encerrado'}
              </Button>
            </Box>

            <Box mt='20px' width='100%'>
              <Button disabled={!lists} href={`/lista/${permalink}`} fullWidth variant='contained' color='primary' size='large'>
                {lists ? 'Lista aniversário' : 'No Hay'}
              </Button>
            </Box>
          </Box>

          <Box
            mt={['20px', '0']}
            mx={['0', '30px']}
          >
            <Box>
              <SectionTitle
                bottom
                title={`${party} // ${edition}`}
              />

              <Flex mt='20px'>
                <TwitterShareButton
                  url={document.location.href}
                  via={currentConfig.twitter_mention}
                  title={`${party} // ${edition} ${moment(date).format('ddd DD [de] MMMM')}`}
                >
                  <TwitterIcon
                    size={32}
                    round />
                </TwitterShareButton>
              </Flex>

              {description &&
              <JsxParser
                jsx={description}
              />
              }

            </Box>
          </Box>

        </Flex>

        <GuestForm
          open={this.state.open}
          party={_id}
          onClose={() => this.setState({ open: false })}
        />
      </main>
    )
  }
}

export default Agenda
