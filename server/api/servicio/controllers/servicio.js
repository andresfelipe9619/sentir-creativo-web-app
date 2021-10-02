const { sanitizeEntity } = require('strapi-utils')
const populate = [
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
    const { body: files } = request
    const entity = await strapi.services.servicio.findOne({ id }, ['id'])
    let result = []
    if (!entity) throw new Error('Servicio No Encontrado')
    if (!Array.isArray(files)) throw new Error('No hay archivos para agregar')

    const knex = strapi.connections.default
    await knex.transaction(async trx => {
      const ids = await trx('servicios__archivos').insert(
        files.map(fileId => ({
          servicio_id: id,
          archivo_id: fileId
        })),
        'id'
      )
      result = ids
    })
    return result
  }
}
