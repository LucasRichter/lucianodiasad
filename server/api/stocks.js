const cache = require('memory-cache')
const axios = require('axios')

let memCache = new cache.Cache()
let cacheMiddleware = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cacheContent = memCache.get(key)
    if (cacheContent) {
      res.send(cacheContent)
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        memCache.put(key, body, duration * 1000)
        res.sendResponse(body)
      }
      next()
    }
  }
}

module.exports = server => {
  server.get('/api/stocks', cacheMiddleware(60), (req, res) => {
    axios.get(process.env.FINANCIAL_URL, { params: { key: process.env.API_KEY } })
      .then(({ data }) => res.send({ stocks: data.results.stocks }))
      .catch(() => res.status(400).send({ error: true }))
  })
}
