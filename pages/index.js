import React from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import SectionTitle from '../components/SectionTitle'
import { Box, Flex } from '@rebass/grid'
import Parser from 'rss-parser'
import NewsFeed from '../components/NewsFeed'
import { getEvents } from '../services/eventsServices'
import { getHomeImage } from '../services/homeServices'
import SectionImage from '../components/SectionImage'
import Location from '../components/Location'
import ContactForm from '../components/ContactForm'
import Events from '../components/Events'
import StockExchange from '../components/StockExchange'
import Axios from 'axios'
import iconv from 'iconv-lite'
import { Buffer } from 'buffer'

const rssLinks = [
  'http://www.stf.jus.br/portal/RSS/noticiaRss.asp?codigo=1', // STF
  'https://res.stj.jus.br/hrestp-c-portalp/RSS.xml',
  'http://www.tjrs.jus.br/site_php/noticias/news_rss.php'
]

const index = ({ news, events, currentConfig, homeImage, stocks }) => {
  return (
    <main>
      <PageHead
        title='Luciano Dias'
        description='Luciano Dias'
      />
      <Flex
        bg='#9a2617'
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
      <Box id='escritorio' bg='white'>
        <SectionImage
          title='Escritório'
          jsxText={currentConfig.home_text}
          image={homeImage}
        />
      </Box>

      <Box id='localizacao' bg='#f2f2f2'>
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
  let parser = new Parser({
    defaultRSS: 2.0,
    headers: {Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'}
  })
  let news = []
  const events = await getEvents({ limit: currentConfig.number_events })

  for (let url of rssLinks) {
    let feed
    if (url.startsWith('https')) {
      feed = await parser.parseURL(url)
    } else {
      const res = await Axios.get(url, { responseType: 'arraybuffer' })
      const decode = iconv.decode(Buffer.from(res.data), 'iso-8859-1')
      feed = await parser.parseString(decode)
    }

    feed.items = feed.items.splice(0, currentConfig ? currentConfig.number_events : 5)
    news = [...news, feed]
  }
  const stocks = await Axios.get('/api/stocks')
  const homeImage = await getHomeImage()
  return { news, events, homeImage, stocks: stocks.data.stocks }
}

export default index
