'use strict'
const axios = require('axios')
const webhook = process.env.WEBHOOK_DOSSIER

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
      const { comentario, servicio, email, ...data } = body
      const knex = strapi.connections.default
      if (!body.email) throw new Error('Email is required')

      async function findOrCreate (model, find, props) {
        let result = await strapi.services[model].findOne(find)
        if (!result) {
          result = await strapi.services[model].create({ ...find, ...props })
        }
        return result
      }
      const audience = await findOrCreate(
        'audiencia',
        { email },
        {
          ...data,
          email,
          cercania: 2,
          origen: 1,
          antiguedad: 2,
          motivacion: 7,
          estado: 8
        }
      )
      if (comentario) {
        const comment = await strapi.services.comentario.create({ comentario })
        await knex.transaction(async trx => {
          await trx('audiencias__comentarios').insert([
            {
              audiencia_id: audience.id,
              comentario_id: comment.id
            }
          ])
        })
      }

      const webhookData = { ...audience, servicio }
      const { data: result } = await axios.post(webhook, webhookData)
      return result
    } catch (error) {
      console.error(error)
      return ctx.throw(500, error.toString())
    }
  },
  async addFiles (ctx) {
    const { request, params } = ctx
    const { id } = params
    const { body: files } = request
    const result = await strapi.services.archivo.addFiles({
      id,
      files,
      collection: 'audiencia'
    })
    return result
  }
}
