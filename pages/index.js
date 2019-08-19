import React from 'react'
import PropTypes from 'prop-types'
import PageHead from '../components/PageHead'
import SectionTitle from '../components/SectionTitle'
import { Box, Flex } from '@rebass/grid'
import Parser from 'rss-parser'
import NewsFeed from '../components/NewsFeed'
import Event from '../components/Event'
import { getEvents } from '../services/eventsServices'
import Text from '../components/Text'

const rssLinks = [
  'http://www.stf.jus.br/portal/RSS/noticiaRss.asp?codigo=1', // STF
  'https://feeds.feedburner.com/STJNoticias?format=xml',
  'http://www.tjrs.jus.br/site_php/noticias/news_rss.php '
]

const index = ({ news, events }) => {
  return (
    <main>
      <PageHead
        title='Luciano Dias'
        description='Luciano Dias'
      />
      <Box
        mt='20px'
        mx={['20px', '120px']}
      >
        <Box my='40px'>
          <SectionTitle
            title='Seminários'
            white
          />
        </Box>

        <Flex
          alignItems='flex-start'
          justifyContent={['center', 'space-between']}
          pb='40px'
          mb='20px'
          css={{ borderBottom: '1px solid white' }}
          flexWrap='wrap'

        >
          {!events.length
            ? <Text color='white' fontSize='18px'>Não há próximos semninários</Text>
            : events.map((event, index) => (
              <Event
                index={index + 1}
                key={event.title}
                event={event}
              />
            ))}
        </Flex>
        <Box width='800px' mr='50px'>
          <Box mb='10px'>
            <SectionTitle
              title='Notícias'
              white
            />
          </Box>
          <NewsFeed news={news} />
        </Box>
      </Box>
    </main>
  )
}

index.propTypes = {
  news: PropTypes.array.isRequired,
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

  return { news, events }
}

export default index
