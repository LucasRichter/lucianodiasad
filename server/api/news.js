const rssLinks = [
  'http://www.stf.jus.br/portal/RSS/noticiaRss.asp?codigo=1', // STF
  'https://res.stj.jus.br/hrestp-c-portalp/RSS.xml',
  'http://www.tjrs.jus.br/site_php/noticias/news_rss.php'
]
const Parser = require('rss-parser')
const Axios = require('axios')
const iconv = require('iconv-lite')

module.exports = server => {
  server.get('/api/news', async (req, res) => {
    let parser = new Parser({
      defaultRSS: 2.0,
      headers: {Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3'}
    })
    let news = []

    for (let url of rssLinks) {
      let feed
      if (url.startsWith('https')) {
        feed = await parser.parseURL(url)
      } else {
        const res = await Axios.get(url, { responseType: 'arraybuffer' })
        const decode = iconv.decode(Buffer.from(res.data), 'iso-8859-1')
        feed = await parser.parseString(decode)
      }

      feed.items = feed.items.splice(0, 5)
      news = [...news, feed]
    }
    return res.send({news})
  })
}
