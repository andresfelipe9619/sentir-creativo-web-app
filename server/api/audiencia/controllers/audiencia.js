'use strict'
const axios = require('axios')
const webhook = process.env.WEBHOOK_URL

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async dossier (ctx) {
    try {
      const { request } = ctx
      const { body } = request
      console.log(`body`, body)
      const { comentario, service, ...data } = body
      const knex = strapi.connections.default
      console.log(`webhook`, webhook)
      if (!body.email) throw new Error('Email is required')
      const audience = await strapi.services.audiencia.create(data)
      const comment = await strapi.services.comentario.create({ comentario })
      console.log(`comment`, comment)
      await knex.transaction(async trx => {
        await trx('audiencias__comentarios').insert([
          {
            audiencia_id: audience.id,
            comentario_id: comment.id
          }
        ])
      })

      const { data: result } = await axios.post(webhook, audience)
      return result
    } catch (error) {
      console.error(error)
      return ctx.throw(500, error.toString())
    }
  }
}
