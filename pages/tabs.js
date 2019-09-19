import React from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import { Box } from '@rebass/grid'
import Axios from 'axios'
import SectionTitle from '../components/SectionTitle'

const Tabs = ({ tab, colors }) => {
  const { title, content } = tab
  return (
    <main>
      <PageHead
        title={`Luciano Dias | ${title}`}
      />
      <Box
        bg={colors.ternary}
        py='20px'
        px={['0', '30px']}
      >
        <Box mb='30px'>
          <SectionTitle
            bottom
            color={colors.secondary}
            title={`${title}`}
          />
        </Box>

        <div dangerouslySetInnerHTML={{ __html: content }} />

      </Box>
    </main>
  )
}

Tabs.propTypes = {
  tab: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired
}

Tabs.defaultProps = {
  tab: {}
}

Tabs.getInitialProps = async ({ query: { slug } }) => {
  const res = await Axios.get('/api/tabs?permalink=' + slug)
  return { tab: res.data[0] }
}

export default Tabs
