'use strict'
const { sanitizeEntity } = require('strapi-utils')
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const populate = [
  'id',
  'prioridad',
  'archivos',
  'archivos.tipo_archivo'
]

module.exports = {
  async find (ctx) {
    let entities
    if (ctx.query._q) {
      entities = await strapi.services.areas.search(ctx.query)
    } else {
      entities = await strapi.services.areas.find(ctx.query, populate)
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.areas })
    )
  },
  async findOne (ctx) {
    const { id } = ctx.params
    const entity = await strapi.services.areas.findOne({ id }, populate)
    return sanitizeEntity(entity, { model: strapi.models.areas })
  },
};
