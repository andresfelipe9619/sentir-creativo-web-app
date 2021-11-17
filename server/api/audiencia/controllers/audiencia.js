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
      console.log(`webhook`, webhook)
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
    let { body: files } = request
    const entity = await strapi.services.audiencia.findOne({ id }, [
      'id',
      'archivos'
    ])
    let ids = []
    if (!entity) throw new Error('Audiencia No Encontrada')
    if (!Array.isArray(files)) throw new Error('No hay archivos para agregar')
    let serviceFiles = (entity.archivos || []).map(({ id }) => id)
    files = files.filter(f => !serviceFiles.includes(f))
    const knex = strapi.connections.default
    await knex.transaction(async trx => {
      ids = await trx('audiencias__archivos').insert(
        files.map(fileId => ({
          audiencia_id: id,
          archivo_id: fileId
        }))
      )
    })
    let result = []
    if (ids.length) {
      result = await knex
        .select('*')
        .from('audiencias__archivos')
        .whereIn('id', ids)
    }
    return result
  }
}
