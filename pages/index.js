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

const rssLinks = [
  'http://www.stf.jus.br/portal/RSS/noticiaRss.asp?codigo=1', // STF
  'https://feeds.feedburner.com/STJNoticias?format=xml',
  'http://www.tjrs.jus.br/site_php/noticias/news_rss.php '
]

const index = ({ news, events, currentConfig, homeImage }) => {
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
        <Box>
          <Box my='40px'>
            <SectionTitle
              title='Seminários'
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
  news: PropTypes.array.isRequired,
  currentConfig: PropTypes.object.isRequired,
  homeImage: PropTypes.object,
  events: PropTypes.array.isRequired
}

index.defaultProps = {
  events: []
}

index.getInitialProps = async ({ currentConfig }) => {
  let parser = new Parser()
  let news = []
  const events = await getEvents({ limit: currentConfig.number_events })

  for (let link of rssLinks) {
    let feed = await parser.parseURL(link)
    feed.items = feed.items.splice(0, currentConfig ? currentConfig.number_events : 5)
    news = [...news, feed]
  }
  const homeImage = await getHomeImage()
  return { news, events, homeImage }
}

export default index
