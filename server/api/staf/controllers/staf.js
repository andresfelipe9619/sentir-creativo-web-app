'use strict';
const { sanitizeEntity } = require('strapi-utils');
const axios = require('axios')
const webhook_artist = process.env.WEBHOOK_ARTIST

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
  async new(ctx) {
    const { request } = ctx;
    let {
      prefijo,
      nombre,
      apellido,
      fechaNacimiento,
      nacionalidad,
      nombreArtistico,
      ciudad,
      celular,
      email,
      coupon,
      tecnicas,
      oficio
    } = request.body;

    try {
      console.log(`BODY: `, request.body);

      const staf = await strapi.services.staf.create({
        nombre,
        apellido,
        nombreArtistico,
        oficio,
        nacionalidad,
        email,
        celular: celular || null,
        tecnica_artisticas: tecnicas,
        fechaNacimiento,
        cuponDescuento: [coupon],
        prefijo,
        destacado: false,
        ciudad,
        origen: 1,
        roles: [6],
        estado: 4
      });

      const { data: result } = await axios.post(webhook_artist, staf);
      console.log(`WEBHOOK RESULT: `, result);
      return staf;
    } catch (error) {
      console.error(error);
      return ctx.throw(500, error.toString());
    }
  },
  async addFiles (ctx) {
    const { request, params } = ctx;
    const { id } = params;
    const { body: files } = request;
    const result = await strapi.services.archivo.addFiles({
      id,
      files,
      collection: 'staf'
    });
    return result;
  },
};
