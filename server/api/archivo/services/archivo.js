'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async addFiles ({ id, files, collection }) {
    const entity = await strapi.services[collection].findOne({ id }, [
      'id',
      'archivos'
    ])
    let ids = []
    if (!entity) throw new Error(`${collection} No Encontrada`)
    if (!Array.isArray(files)) throw new Error('No hay archivos para agregar')
    let serviceFiles = (entity.archivos || []).map(({ id }) => id)
    let filesToAdd = files.filter(f => !serviceFiles.includes(f))
    const knex = strapi.connections.default
    await knex.transaction(async trx => {
      ids = await trx(`${collection}s__archivos`).insert(
        filesToAdd.map(fileId => ({
          [`${collection}_id`]: id,
          archivo_id: fileId
        }))
      )
    })
    let result = []
    if (ids.length) {
      result = await knex
        .select('*')
        .from(`${collection}s__archivos`)
        .whereIn('id', ids)
    }
    return result
  }
}
