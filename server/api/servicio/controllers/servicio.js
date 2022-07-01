const { sanitizeEntity } = require('strapi-utils')
const populate = [
  'id',
  'area',
  'tags',
  'stafs',
  'estado',
  'propositos',
  'notas',
  'acuerdos',
  'colecciones',
  'prioridad',
  'publico_objetivos',
  'sugerencias',
  'formatos',
  'ocasions',
  'archivos',
  'condicions',
  'tecnica_artisticas',
  'archivos.tipo_archivo',
  'comentarios.userId'
]

module.exports = {
  async find(ctx) {
    let entities
    console.log('ctx.query', ctx.query)
    if (ctx.query.dense) {
      Reflect.deleteProperty(ctx.query, "dense")
      entities = await strapi.services.servicio.find(ctx.query)
    } else if (ctx.query._q) {
      entities = await strapi.services.servicio.search(ctx.query)
    } else {
      entities = await strapi.services.servicio.find(ctx.query, populate)
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.servicio })
    )
  },
  async findOne(ctx) {
    const { id } = ctx.params
    const entity = await strapi.services.servicio.findOne({ id }, populate)
    return sanitizeEntity(entity, { model: strapi.models.servicio })
  },
  async addFiles(ctx) {
    const { request, params } = ctx
    const { id } = params
    const { body: files } = request
    const result = await strapi.services.archivo.addFiles({
      id,
      files,
      collection: 'servicio'
    })
    return result
  },
  async upload(ctx) {
    const { request } = ctx;
    const toMinutes = x => x / (60 * 1000);
    let {
      id: stafId,
      area,
      servicioNombre: nombre,
      slogan,
      sintesis,
      trayectoria,
      formato,
      tecnicasArtisticas,
      tags,
      cantidadArtistas,
      cantidadArtistasApoyo,
      duracionMinima,
      duracionMaxima,
      sesionesMinimo,
      sesionesMaximas,
      duracionMontaje,
      duracionDesmontaje,
      minimoParticipantes,
      maximoParticipantes,
      publicoObjetivo,
      ocasiones
    } = request.body;

    cantidadArtistas = parseInt(cantidadArtistas);
    cantidadArtistasApoyo = parseInt(cantidadArtistasApoyo);
    duracionMinima = toMinutes(duracionMinima);
    duracionMaxima = toMinutes(duracionMaxima);
    sesionesMinimo = parseInt(sesionesMinimo);
    sesionesMaximas = parseInt(sesionesMaximas);
    duracionMontaje = toMinutes(duracionMontaje);
    duracionDesmontaje = toMinutes(duracionDesmontaje);
    minimoParticipantes = parseInt(minimoParticipantes);
    maximoParticipantes = parseInt(maximoParticipantes);

    try {
      console.log(`BODY: `, request.body);

      const servicio = await strapi.services.servicio.create({
        nombre,
        slogan,
        sintesis,
        tags,
        tecnica_artisticas: tecnicasArtisticas,
        ocasions: ocasiones,
        colorPrimario: area.colorPrimario,
        colorSecundario: area.colorSecundario,
        publico_objetivos: publicoObjetivo,
        area: area.id,
        formatos: formato,
        stafs: stafId,
        minimoParticipantes,
        maximoParticipantes,
        cantidadArtistas,
        cantidadArtistasApoyo,
        duracionMinima,
        duracionMaxima,
        sesionesMinimo,
        sesionesMaximas,
        duracionMontaje,
        duracionDesmontaje,
        trayectoria
      });

      return servicio;
    } catch (error) {
      console.error(error);
      return ctx.throw(500, error.toString());
    }
  }
}
