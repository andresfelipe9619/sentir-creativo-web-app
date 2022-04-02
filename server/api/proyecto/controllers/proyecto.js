'use strict'
const { sanitizeEntity } = require('strapi-utils')
const axios = require('axios')
const webhook = process.env.WEBHOOK_TICKET

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const populate = [
  'id',
  'staf',
  'audiencia',
  'formatos',
  'propositos',
  'servicios',
  'tipo_proyecto',
  'estado_proyecto',
  'publico_objetivos',
  'cupon_descuentos',
  'archivos',
  'comentarios',
  'presupuestos',
  'audiencia.organizacion',
  'archivos.tipo_archivo',
  'destacado'
]

module.exports = {
  async find (ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services.proyecto.search(ctx.query)
    } else {
      entities = await strapi.services.proyecto.find(ctx.query, populate)
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.proyecto })
    )
  },
  async findOne (ctx) {
    const { id } = ctx.params
    const entity = await strapi.services.proyecto.findOne({ id }, populate)
    return sanitizeEntity(entity, { model: strapi.models.proyecto })
  },
  async start (ctx) {
    const { request } = ctx
    let {
      prefijo,
      nombre,
      email,
      apellido,
      celular,
      comentario,
      organizacion,
      rubro,
      servicio,
      publicoObjetivo,
      ciudad,
      formato,
      impacto,
      departamento,
      coupon
    } = request.body
    try {
      console.log(`BODY: `, request.body)
      if (!email) throw new Error('No hay Email para empezar proyecto')
      const knex = strapi.connections.default
      let audience = await strapi.services.audiencia.findOne({ email })
      let org = null

      async function findOrCreate (model, find, props) {
        let result = await strapi.services[model].findOne(find)
        if (!result) {
          result = await strapi.services[model].create({ ...find, ...props })
        }
        return result
      }

      if (organizacion) {
        org = findOrCreate('organizacion', { nombre: organizacion }, { rubro })
      }

      if (!audience) {
        audience = await strapi.services.audiencia.create({
          nombre,
          apellido,
          email,
          celular,
          ciudad,
          prefijo,
          departamento,
          cercania: 3,
          origen: 1,
          antiguedad: 3,
          motivacion: 5,
          estado: 7,
          organizacion: org.id
        })
      }
      console.log(`audience`, audience)

      const proyecto = await strapi.services.proyecto.create({
        nombre: servicio.nombre,
        formato,
        impacto: `${impacto} personas`,
        audiencia: audience.id,
        // estado: 1,
        tipoProyecto: 3,
        cupon_descuentos: [coupon],
        servicios: [servicio]
      })
      console.log(`proyecto`, proyecto)
      if (!proyecto) {
        throw new Error('Algo salió mal creando el proyecto')
      }
      if (comentario) {
        const comment = await strapi.services.comentario.create({ comentario })
        await knex.transaction(async trx => {
          await trx('proyectos__comentarios').insert([
            {
              proyecto_id: proyecto.id,
              comentario_id: comment.id
            }
          ])
        })
      }
      if (publicoObjetivo) {
        await knex.transaction(async trx => {
          await trx('proyectos__publico_objetivos').insert(
            publicoObjetivo.map(id => ({
              proyecto_id: proyecto.id,
              'publico-objetivo_id': id
            }))
          )
        })
      }
      let [finalResult] = await strapi.services.proyecto.find(
        { id: proyecto.id },
        populate
      )

      const webhookData = { ...audience, servicio, ticket: finalResult }
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
      collection: 'proyecto'
    })
    return result
  }
}
