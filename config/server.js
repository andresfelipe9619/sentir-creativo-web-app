const cronTasks = require('./functions/cron')

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron: {
    enabled: true,
    tasks: cronTasks
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '6452fb20c72e6f4c35d884c4344f52a6')
    }
  }
})
