const { sanitizeEntity } = require('strapi-utils')
const populate = [
  'id',
  'archivos',
  'servicios',
  'cuponDescuento',
  'archivos.tipo_archivo'
]

module.exports = {
  async find (ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services.coleccion.search(ctx.query)
    } else {
      entities = await strapi.services.coleccion.find(ctx.query, populate)
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.coleccion })
    )
  },
  async findOne (ctx) {
    const { id } = ctx.params
    const entity = await strapi.services.coleccion.findOne({ id }, populate)
    return sanitizeEntity(entity, { model: strapi.models.coleccion })
  },
  async addFiles (ctx) {
    const { request, params } = ctx
    const { id } = params
    const { body: files } = request
    const result = await strapi.services.archivo.addFiles({
      id,
      files,
      collection: 'coleccion'
    })
    return result
  }
}
