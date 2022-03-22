'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async delete(ctx) {
    const { id } = ctx.params;
    const [fileId, collection] = id.split('.');
    const knex = strapi.connections.default

    if (!collection) {
      return await knex('archivos')
        .where('archivos.id', fileId)
        .del()
    }

    return await knex('archivos')
      .where('archivos.id', fileId)
      .join(`${collection}s__archivos`, 'archivos.id', `${collection}s__archivos.archivo_id`)
      .del()
  }
};
