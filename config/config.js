const appName = 'adv'
const serverPort = process.env.PORT || 8081

const completeConfig = {
  default: {
    appName,
    serverPort,
    databaseUrl: process.env.MONGODB_URI,
    jsonOptions: {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  },

  development: {
    appUrl: `http://localhost:${serverPort}/`
  },

  production: {
    appUrl: `lucianodiasadv.kinghost.net/`
  }

}

// Public API
module.exports = {
  config: { ...completeConfig.default, ...completeConfig[process.env.NODE_ENV] },
  completeConfig
}
