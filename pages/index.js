import React from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import SectionTitle from '../components/SectionTitle'
import { Box, Flex } from '@rebass/grid'
import NewsFeed from '../components/NewsFeed'
import { getEvents } from '../services/eventsServices'
import { getHomeImage } from '../services/homeServices'
import SectionImage from '../components/SectionImage'
import Location from '../components/Location'
import ContactForm from '../components/ContactForm'
import Events from '../components/Events'
import StockExchange from '../components/StockExchange'
import Axios from 'axios'
import colors from '../helpers/colors'

const index = ({ news, events, currentConfig, homeImage, stocks }) => {
  return (
    <main>
      <PageHead
        title='Luciano Dias'
        description='Luciano Dias'
      />
      <Flex
        bg={colors.gray}
        justifyContent='space-between'
        px={['20px', '120px']}
        py='50px'
        css={{ borderBottom: '1px solid white' }}
      >
        <Box css={{ maxWidth: 400 }}>
          <Box my='40px'>
            <SectionTitle
              title='Próximos Seminários'
              white
            />
          </Box>

          <Events events={events} />
        </Box>

        <Box>
          <Box mb='10px'>
            <SectionTitle
              title='Notícias'
              white
            />
          </Box>
          <NewsFeed news={news} />
        </Box>
      </Flex>
      <StockExchange stocks={stocks} />
      <Box id='escritorio' bg={colors.dark}>
        <SectionImage
          title='Escritório'
          jsxText={currentConfig.home_text}
          image={homeImage}
        />
      </Box>

      <Box id='localizacao' bg={colors.jet}>
        <Location email={currentConfig.contact_email} />
      </Box>

      <Box id='contato' css={{ borderBottom: '1px solid white' }}>
        <ContactForm />
      </Box>
    </main>
  )
}

index.propTypes = {
  news: PropTypes.array,
  stocks: PropTypes.array,
  currentConfig: PropTypes.object,
  homeImage: PropTypes.object,
  events: PropTypes.array
}

index.defaultProps = {
  events: []
}

index.getInitialProps = async ({ currentConfig }) => {
  const events = await getEvents({ limit: currentConfig.number_events })
  const news = await Axios.get('/api/news')
  const stocks = await Axios.get('/api/stocks')
  const homeImage = await getHomeImage()
  return { news: news.data.news, events, homeImage, stocks: stocks.data.stocks }
}

export default index
