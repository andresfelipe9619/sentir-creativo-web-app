const { sanitizeEntity } = require('strapi-utils')
const populate = [
  'id',
  'area',
  'tags',
  'estado',
  'propositos',
  'notas',
  'acuerdos',
  'colecciones',
  'prioridad',
  'publico_objetivos',
  'sugerencias',
  'formatos',
  'ocasions',
  'archivos',
  'condicions',
  'tecnica_artisticas',
  'archivos.tipo_archivo',
  'comentarios.userId'
]

module.exports = {
  async find (ctx) {
    let entities
    console.log('ctx.query', ctx.query)
    if (ctx.query.dense) {
      Reflect.deleteProperty(ctx.query, "dense")
      entities = await strapi.services.servicio.find(ctx.query)
    } else if (ctx.query._q) {
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
    const result = await strapi.services.archivo.addFiles({
      id,
      files,
      collection: 'servicio'
    })
    return result
  }
}