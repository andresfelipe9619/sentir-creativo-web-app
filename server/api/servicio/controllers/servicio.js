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
  }
}
