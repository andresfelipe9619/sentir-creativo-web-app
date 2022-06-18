module.exports = {
  //...
  settings: {
    cors: {
      origin: [
        'http://localhost:1337',
        'http://localhost:5000',
        'https://www.sentircreativo.com',
        'https://priceless-mirzakhani-124f21.netlify.app'
      ]
    },
    pluginAuditLogTrails: {
      enabled: true
    }
  }
}
