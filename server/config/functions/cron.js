'use strict'
const axios = require('axios')
const APP = 'my-app-787742'
const APP_VERSION = 1
const BASE_URL = 'https://api.integromat.com/v1'
const URL = `${BASE_URL}/app/${APP}/${APP_VERSION}/common`
const TOKEN = process.env.INTEGROMAT_TOKEN
const SDK_VERSION = '1.3.9'
/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/setup-deployment-guides/configurations.html#cron-tasks
 */
// 	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ1NDU0ODgwLCJleHAiOjE2NDYzMTg4ODB9.gCwcpWSrA5PsjPApJdhoa082q1NFlPS4QHMmp5HxGsU"
module.exports = {
  '0 0 * * 1': async () => {
    if (!TOKEN) return console.log('=== NO INTEGROMAT TOKEN ===')
    console.log('=== CRON INIT ===')
    try {
      const jwt = strapi.plugins['users-permissions'].services.jwt.issue({
        id: 1
      })
      console.log('jwt', jwt)
      const data = {
        token: jwt
      }
      const config = {
        headers: {
          Authorization: `Token ${TOKEN}`,
          'Content-Type': 'application/json',
          'x-imt-apps-sdk-version': SDK_VERSION
        }
      }
      const { data: result } = await axios.put(
        URL,
        JSON.stringify(data),
        config
      )
      console.log('RESULT: ', result)
      return result
    } catch (error) {
      console.log('=== CRON ERROR === ', error)
    } finally {
      console.log('=== CRON END ===')
    }
  }
}
