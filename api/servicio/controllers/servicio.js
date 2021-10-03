const { sanitizeEntity } = require('strapi-utils')
const populate = [
  'id',
  'area',
  'tags',
  'estado',
  'propositos',
  'notas',
  'prioridad',
  'publico_objetivos',
  'sugerencias',
  'formatos',
  'ocasions',
  'archivos',
  'condicions',
  'tecnica_artisticas',
  'archivos.tipo_archivo'
]

module.exports = {
  async find (ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services.servicio.search(ctx.query)
    } else {
      entities = await strapi.services.servicio.find(ctx.query, populate)
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.servicio })
    )
  },
  async findOne (ctx) {
    const { id } = ctx.params
    const entity = await strapi.services.servicio.findOne({ id }, populate)
    return sanitizeEntity(entity, { model: strapi.models.servicio })
  },
  async addFiles (ctx) {
    const { request, params } = ctx
    const { id } = params
    let { body: files } = request
    const entity = await strapi.services.servicio.findOne({ id }, populate)
    let ids = []
    if (!entity) throw new Error('Servicio No Encontrado')
    if (!Array.isArray(files)) throw new Error('No hay archivos para agregar')
    let serviceFiles = (entity.archivos || []).map(({ id }) => id)
    files = files.filter(f => !serviceFiles.includes(f))
    const knex = strapi.connections.default
    await knex.transaction(async trx => {
      ids = await trx('servicios__archivos').insert(
        files.map(fileId => ({
          servicio_id: id,
          archivo_id: fileId
        }))
      )
    })
    let result = []
    if (ids.length) {
      result = await knex
        .select('*')
        .from('servicios__archivos')
        .whereIn('id', ids)
    }
    return result
  }
}
