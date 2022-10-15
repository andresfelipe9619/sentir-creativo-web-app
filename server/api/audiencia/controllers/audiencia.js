'use strict'
const axios = require('axios')
const webhook = process.env.WEBHOOK_DOSSIER
const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const populate = [
  'id',
  'nombre',
  'email',
  'celular',
  'organizacion',
  'departamento',
  'cargo',
  'antiguedad',
  'cercania',
  'motivacion',
  'sector',
  'published_at',
  'created_at',
  'updated_at',
  'apellido',
  'profesion',
  'estado',
  'notas',
  'bitacoras',
  'prefijo',
  'origen',
  'cuponDescuento',
  'email2',
  'destacado',
  'ciudad',
  'documentoIdentidad',
  'proyectos',
  'proyectos.estado_proyecto',
  'intereses',
  'tags',
  'comentarios.userId',
  'archivos.tipo_archivo',
  'difusiones',
];

module.exports = {
  async find (ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.audiencia.search(ctx.query);
    } else {
      entities = await strapi.services.audiencia.find(ctx.query, populate);
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.audiencia })
    )
  },
  async findOne (ctx) {
    const { id } = ctx.params;
    const entity = await strapi.services.audiencia.findOne({ id }, populate);
    return sanitizeEntity(entity, { model: strapi.models.audiencia });
  },
  async dossier (ctx) {
    try {
      const { request, state } = ctx
      const { body } = request
      console.log(`body`, body)
      console.log(`state`, state.user)
      const { comentario, servicio, email, ...data } = body
      const knex = strapi.connections.default
      if (!body.email) throw new Error('Email is required')

      async function findOrCreate (model, find, props) {
        let result = await strapi.services[model].findOne(find)
        if (!result) {
          result = await strapi.services[model].create({ ...find, ...props })
        }
        return result
      }
      const audience = await findOrCreate(
        'audiencia',
        { email },
        {
          ...data,
          email,
          cercania: 2,
          origen: 1,
          antiguedad: 2,
          motivacion: 7,
          estado: 8
        }
      );
      if (comentario) {
        const comment = await strapi.services.comentario.create({ comentario })
        await knex.transaction(async trx => {
          await trx('audiencias__comentarios').insert([
            {
              audiencia_id: audience.id,
              comentario_id: comment.id
            }
          ])
        })
      }

      const webhookData = { ...audience, servicio }
      const { data: result } = await axios.post(webhook, webhookData)
      await strapi.services.bitacora.create({
        entidad: 'audiencia',
        entidadId: audience.id,
        accion: 'DOSSIER',
        autor: audience,
        contenido: webhookData
      })
      return result
    } catch (error) {
      console.error(error)
      return ctx.throw(500, error.toString())
    }
  },
  async addFiles (ctx) {
    const { request, params } = ctx
    const { id } = params
    const { body: files } = request
    console.log(`files`, files)
    const result = await strapi.services.archivo.addFiles({
      id,
      files,
      collection: 'audiencia'
    })
    return result
  },
  async updateOrganizacion(ctx) {
    const { request, params } = ctx;
    const { id } = params;
    const { body } = request;
    const organizacion = await strapi.services.organizacion.findOne({ id: body.organizacionId });
    const result = await strapi.services.audiencia.update({id}, { organizacion });
    return result;
  }
}
