import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import { Flex, Box } from '@rebass/grid'
import Axios from 'axios'
import SectionTitle from '../components/SectionTitle'
import styled from 'styled-components'
import GuestForm from '../components/GuestForm'

const Image = styled.img`
  max-width: 433px;
  width: 100%;
`

class Agenda extends Component {
  static propTypes = {
    event: PropTypes.object.isRequired
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
    const { event } = this.props
    const { _id, title, description, cover } = event

    return (
      <main>
        <PageHead
          title={`Luciano Dias | ${title}`}
        />

        <Flex
          css={{ backgroundColor: '#333533' }}
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
              alt={title}
            />
          </Box>

          <Box
            mt={['20px', '0']}
            mx={['0', '30px']}
          >
            <Box>
              <Box mb='30px'>
                <SectionTitle
                  bottom
                  title={`${title}`}
                />
              </Box>

              {description &&
              <div dangerouslySetInnerHTML={{ __html: description }} />
              }

            </Box>
          </Box>

        </Flex>

        <GuestForm
          open={this.state.open}
          event={_id}
          onClose={() => this.setState({ open: false })}
        />
      </main>
    )
  }
}

export default Agenda
