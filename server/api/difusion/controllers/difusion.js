'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const populate = [
  'id',
  'nombre',
  'descripcion',
  'published_at',
  'created_at',
  'updated_at',
  'plataforma',
  'cuponDescuento',
  'audiencias.organizacion',
  'audiencias.organizacion.rubro',
  'audiencias.organizacion.rubro.tipo_rubro',
  'audiencias.bitacoras',
  'audiencias.prefijo',
  'audiencias.notas',
  'audiencias.intereses',
  'audiencias.antiguedad',
  'audiencias.cercania',
  'audiencias.motivacion',
  'audiencias.proyectos.tipo_proyecto',
  'audiencias.proyectos.publico_objetivos',
  'audiencias.proyectos.estado_proyecto',
  'audiencias.proyectos.formatos',
  'audiencias.proyectos.archivos',
  'audiencias.proyectos.servicios',
  'audiencias.archivos.tipo_archivo'
];

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.difusion.search(ctx.query);
    } else {
      entities = await strapi.services.difusion.find(ctx.query, populate);
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.difusion })
    );
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.difusion.findOne({ id }, populate);
    return sanitizeEntity(entity, { model: strapi.models.difusion });
  },
  async addAudiencias(ctx) {
    const { request, params } = ctx;
    const { id } = params;
    let { body: audiencias } = request;
    const entity = await strapi.services.difusion.findOne({ id });
    const ids = entity.audiencias.map(({ id }) => id);
    audiencias = audiencias.filter(x => !ids.includes(x));
    audiencias = await Promise.all([...ids, ...audiencias].map(id => strapi.services.audiencia.findOne({ id })))
    const result = await strapi.services.difusion.update({id}, { audiencias });
    return result;
  }
};
