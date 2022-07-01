module.exports = {
  //...
  settings: {
    cors: {
      origin: [
        'http://localhost:1337',
        'http://localhost:5001',
        'https://www.sentircreativo.com',
        'https://sentir-creativo-api.herokuapp.com',
        'https://priceless-mirzakhani-124f21.netlify.app'
      ]
    },
    pluginAuditLogTrails: {
      enabled: true
    }
  }
}
