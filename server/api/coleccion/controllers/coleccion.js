'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
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
