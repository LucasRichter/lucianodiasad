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

const MainPage = ({ news, events, currentConfig, colors, homeImage, stocks }) => {
  return (
    <main>
      <PageHead
        title='Luciano Dias'
        description='Luciano Dias'
      />
      <Flex
        bg={colors.ternary}
        justifyContent='space-between'
        flexWrap='wrap'
        px={['20px', '120px']}
        py='50px'
      >
        <Box width={['100%', '400px']}>
          <Box m='40px 0 10px'>
            <SectionTitle
              title='Próximos Seminários'
              color={colors.secondary}
            />
          </Box>

          <Events colors={colors} events={events} />
        </Box>

        <Box width={['100%', '540px']}>
          <Box mb='10px'>
            <SectionTitle
              title='Notícias'
              color={colors.secondary}
            />
          </Box>
          <NewsFeed colors={colors} news={news} />
        </Box>
      </Flex>
      <StockExchange colors={colors} stocks={stocks} />
      <Box id='escritorio' bg={colors.ternary}>
        <SectionImage
          colors={colors}
          title='Escritório'
          jsxText={currentConfig.home_text}
          image={homeImage}
        />
      </Box>

      <Box id='localizacao' bg={colors.secondary}>
        <Location colors={colors} email={currentConfig.contact_email} />
      </Box>

      <Box id='contato' bg={colors.ternary}>
        <ContactForm colors={colors} />
      </Box>
    </main>
  )
}

MainPage.propTypes = {
  news: PropTypes.array,
  stocks: PropTypes.array,
  currentConfig: PropTypes.object,
  colors: PropTypes.object,
  homeImage: PropTypes.object,
  events: PropTypes.array
}

MainPage.defaultProps = {
  events: []
}

MainPage.getInitialProps = async ({ currentConfig }) => {
  const events = await getEvents({ limit: currentConfig.number_events })
  const news = await Axios.get('/api/news')
  const stocks = await Axios.get('/api/stocks')
  const homeImage = await getHomeImage()
  return { news: news.data.news, events, homeImage, stocks: stocks.data.stocks }
}

export default MainPage
