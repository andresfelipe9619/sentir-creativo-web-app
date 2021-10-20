'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async start(ctx) {
    const { request } = ctx
    let {
      nombre,
      email,
      apellido,
      celular,
      comentario,
      organizacion,
      rubro,
      servicio,
      publicoObjetivo,
      ciudad,
      formato,
      impacto,
      departamento
    } = request.body
    try {
      console.log(`BODY: `, request.body)
      if (!email) throw new Error('No hay Email para empezar proyecto')
      const knex = strapi.connections.default
      let audience = await strapi.services.audiencia.findOne({ email })
      console.log(`audience`, audience)
      let org = null

      async function findOrCreate(model, find, props) {
        let result = await strapi.services[model].findOne(find)
        if (!result) {
          result = await strapi.services[model].create({ ...find, ...props })
        }
        return result
      }

      if (organizacion) {
        org = findOrCreate("organizacion", { nombre: organizacion }, { rubro })
      }

      if (!audience) {
        audience = await strapi.services.audiencia.create({
          nombre,
          apellido,
          email,
          celular,
          ciudad,
          departamento,
          cercania: 4,
          antiguedad: 2,
          estado: 7,
          organizacion: org.id
        })
      }
      console.log(`audience`, audience)

      let project = await strapi.services.proyecto.create({
        nombre: servicio.nombre,
        formato,
        impacto: `${impacto} personas`,
        audiencia: audience.id,
        // estado: 1,
        tipoProyecto: 3
      })
      console.log(`project`, project)
      let comment = await strapi.services.comentario.create({ comentario })
      console.log(`comment`, comment)
      await knex.transaction(async trx => {
        await trx('proyectos__comentarios').insert([
          {
            proyecto_id: project.id,
            comentario_id: comment.id
          }
        ])
        await trx('proyectos__publico_objetivos').insert(
          publicoObjetivo.map(id => ({
            proyecto_id: project.id,
            "publico-objetivo_id": id
          }))
        )
      })

      return { project }
    } catch (error) {
      console.error(error)
      return { error: true }
    }
  }
}
