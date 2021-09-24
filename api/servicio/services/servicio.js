/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async find (params, populate) {
    const knex = strapi.connections.default
    let result = await knex('servicios')
      .whereNot('servicios.created_at', null)
      .innerJoin(
        'servicios__archivos',
        'servicios.id',
        'servicios__archivos.servicio_id'
      )
      .innerJoin('areas', 'areas.id', 'servicios.area')
      .innerJoin('archivos', 'archivos.id', 'servicios__archivos.archivo_id')
      .innerJoin(
        'archivos_tipo_archivos__tipo_archivos_archivos',
        'archivos.id',
        'archivos_tipo_archivos__tipo_archivos_archivos.archivo_id'
      )
      .innerJoin(
        'tipo_archivos',
        'tipo_archivos.id',
        'archivos_tipo_archivos__tipo_archivos_archivos.tipo-archivo_id'
      )
      .select([
        'servicios.id',
        'servicios.nombre',
        'servicios.slogan',
        'servicios.sintesis',
        'servicios.created_at',
        knex.raw(`
            CONCAT(
            '[',
              GROUP_CONCAT(
                JSON_OBJECT(
                  'nombre', archivos.nombre,
                  'path', archivos.path
                )
              ),
            ']'
            ) AS archivos`),
        knex.raw(`
            CONCAT(
            '[',
              GROUP_CONCAT(
                JSON_OBJECT(
                  'nombre', tipo_archivos.nombre
                )
              ),
            ']'
            ) AS tipoArchivos`)
      ])
      .groupBy('servicios.id')
    result = result
      .map(service => ({
        ...service,
        archivos: parseFiles(service)
      }))
      .map(s => {
        delete s.tipoArchivos
        return s
      })
    console.log(`result`, result)
    return result
  }
}

function parseFiles (service) {
  if (isJsonString(service.archivos)) {
    return JSON.parse(service.archivos).map(a => ({
      ...a,
      tipoArchivos: isJsonString(service.tipoArchivos)
        ? JSON.parse(service.tipoArchivos)
        : service.tipoArchivos
    }))
  }
  return service.archivos
}

function isJsonString (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
