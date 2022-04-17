'use strict';
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const populate = [
  'id',
  'published_at',
  'created_at',
  'updated_at',
  'tipo',
  'nombre',
  'apellido',
  'nombreArtistico',
  'oficio',
  'nacionalidad',
  'email',
  'celular',
  'origen',
  'fechaNacimiento',
  'rol',
  'cuponDescuento',
  'estado',
  'prefijo',
  'destacado',
  'ciudad',
  'documentoIdentidad',
  'comentarios.userId',
  'roles',
  'servicios',
  'tecnica_artisticas',
  'archivos.tipo_archivo',
  'proyectos',
  'acuerdos',
];

module.exports = {
  async find (ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.staf.search(ctx.query);
    } else {
      entities = await strapi.services.staf.find(ctx.query, populate);
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.staf })
    );
  },
  async findOne (ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.staf.findOne({ id }, populate);
    return sanitizeEntity(entity, { model: strapi.models.staf });
  },
};
