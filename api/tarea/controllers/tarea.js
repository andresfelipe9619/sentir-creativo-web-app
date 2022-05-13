'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 const populate = [
  'id',
  'nombre',
  'estado_tarea',
  'archivos',
  'archivos.tipo_archivo',
  'destacado',
  'stafs',
  'sprint',
  'fechaInicio',
  'prioridad',
  'duracion',
  'tipo_tarea',
  'proyecto',
  'proyecto.audiencia',
  'proyecto.audiencia.organizacion',
  'avance',
  'sintesis',
  'direccion',
  'bitacoras',
  'bitacoras.staf',
  'bitacoras.audiencia'
];

module.exports = {
  async find (ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.tarea.search(ctx.query);
    } else {
      entities = await strapi.services.tarea.find(ctx.query, populate);
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.tarea })
    );
  },
  async findOne (ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.tarea.findOne({ id }, populate);
    return sanitizeEntity(entity, { model: strapi.models.tarea });
  },
  async addFiles (ctx) {
    const { request, params } = ctx;
    const { id } = params;
    const { body: files } = request;
    const result = await strapi.services.archivo.addFiles({
      id,
      files,
      collection: 'tarea'
    });
    return result;
  },
};
