import axios from 'axios'

const server = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT
})

let token = sessionStorage.getItem('colibri-token') || null

const tokenInterceptor = config => {
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}

const setToken = _token => {
  token = _token
  sessionStorage.setItem('colibri-token', _token)
}

const getToken = () => {
  return token
}

const responseBody = response => response.data

server.interceptors.request.use(tokenInterceptor, Promise.reject)

const serverRequests = {
  del: (url, config) => server.delete(`${url}`, config).then(responseBody),
  get: (url, config) => server.get(`${url}`, config).then(responseBody),
  put: (url, body) => server.put(`${url}`, body).then(responseBody),
  post: (url, body) => server.post(`${url}`, body).then(responseBody)
}

const Auth = {
  login: user => serverRequests.post('/auth/local', user),
  loginGoogle: user => serverRequests.post('/login/google', user),
  register: user => serverRequests.post('/auth/local/register', user)
}

const Proyecto = {
  getAll: () => serverRequests.get(`/proyectos`),
  get: id => serverRequests.get(`/proyectos/${id}`),
  create: project => serverRequests.post('/proyectos', project),
  start: project => serverRequests.post('/proyectos/start', project),
  update: (id, project) => serverRequests.put(`/proyectos/${id}`, project),
  delete: id => serverRequests.del(`/proyectos/${id}`)
}

const Servicio = {
  getAll: config => serverRequests.get(`/servicios`, config),
  get: id => serverRequests.get(`/servicios/${id}`),
  create: service => serverRequests.post('/servicios', service),
  update: (id, service) => serverRequests.put(`/servicios/${id}`, service),
  delete: id => serverRequests.del(`/servicios/${id}`)
}

const Area = {
  getAll: () => serverRequests.get(`/areas`),
  get: id => serverRequests.get(`/areas/${id}`),
  create: area => serverRequests.post('/areas', area),
  update: (id, area) => serverRequests.put(`/areas/${id}`, area),
  delete: id => serverRequests.del(`/areas/${id}`)
}

const Tag = {
  getAll: () => serverRequests.get(`/tags`),
  get: id => serverRequests.get(`/tags/${id}`),
  create: tag => serverRequests.post('/tags', tag),
  update: (id, tag) => serverRequests.put(`/tags/${id}`, tag),
  delete: id => serverRequests.del(`/tags/${id}`)
}

const Archivo = {
  getAll: () => serverRequests.get(`/archivos`),
  get: id => serverRequests.get(`/archivos/${id}`),
  create: archivo => serverRequests.post('/archivos', archivo),
  update: (id, archivo) => serverRequests.put(`/archivos/${id}`, archivo),
  delete: id => serverRequests.del(`/archivos/${id}`),
  addFiles2Entity: (id, entity, files) =>
    serverRequests.post(`/${entity}s/${id}/archivos`, files)
}

const Audiencia = {
  getAll: () => serverRequests.get(`/audiencias?_limit=20`),
  get: id => serverRequests.get(`/audiencias/${id}`),
  dossier: audiencia => serverRequests.post('/audiencias/dossier', audiencia),
  create: audience => serverRequests.post('/audiencias', audience),
  update: (id, audience) => serverRequests.put(`/audiencias/${id}`, audience),
  delete: id => serverRequests.del(`/audiencias/${id}`)
}

const User = {
  getAll: () => serverRequests.get(`/user`),
  profile: () => serverRequests.get('/profile'),
  get: id => serverRequests.get(`/user/${id}`),
  delete: id => serverRequests.del(`/user/${id}`),
  update: (id, user) => serverRequests.put(`/user/${id}`, user)
}

const ServiceState = {
  getAll: () => serverRequests.get(`/estado-servicios`),
  get: id => serverRequests.get(`/estado-servicios/${id}`),
  create: state => serverRequests.post('/estado-servicios', state),
  update: (id, state) => serverRequests.put(`/estado-servicios/${id}`, state),
  delete: id => serverRequests.del(`/estado-servicios/${id}`)
}

const AudienceState = {
  getAll: () => serverRequests.get(`/estado-audiencias`),
  get: id => serverRequests.get(`/estado-audiencias/${id}`),
  create: state => serverRequests.post('/estado-audiencias', state),
  update: (id, state) => serverRequests.put(`/estado-audiencias/${id}`, state),
  delete: id => serverRequests.del(`/estado-audiencias/${id}`)
}

const StaffState = {
  getAll: () => serverRequests.get(`/estado-staffs`),
  get: id => serverRequests.get(`/estado-staffs/${id}`),
  create: state => serverRequests.post('/estado-staffs', state),
  update: (id, state) => serverRequests.put(`/estado-staffs/${id}`, state),
  delete: id => serverRequests.del(`/estado-staffs/${id}`)
}

const PublicoObjetivo = {
  getAll: () => serverRequests.get(`/publico-objetivos`),
  get: id => serverRequests.get(`/publico-objetivos/${id}`),
  create: target => serverRequests.post('/publico-objetivos', target),
  update: (id, target) =>
    serverRequests.put(`/publico-objetivos/${id}`, target),
  delete: id => serverRequests.del(`/publico-objetivos/${id}`)
}

const Formato = {
  getAll: () => serverRequests.get(`/formatoes`),
  get: id => serverRequests.get(`/formatoes/${id}`),
  create: format => serverRequests.post('/formatoes', format),
  update: (id, format) => serverRequests.put(`/formatoes/${id}`, format),
  delete: id => serverRequests.del(`/formatoes/${id}`)
}

const EstadoProyecto = {
  getAll: () => serverRequests.get(`/estado-proyectos`),
  get: id => serverRequests.get(`/estado-proyectos/${id}`),
  create: state => serverRequests.post('/estado-proyectos', state),
  update: (id, state) => serverRequests.put(`/estado-proyectos/${id}`, state),
  delete: id => serverRequests.del(`/estado-proyectos/${id}`)
}

const TipoProyecto = {
  getAll: () => serverRequests.get(`/tipo-proyectos`),
  get: id => serverRequests.get(`/tipo-proyectos/${id}`),
  create: state => serverRequests.post('/tipo-proyectos', state),
  update: (id, state) => serverRequests.put(`/tipo-proyectos/${id}`, state),
  delete: id => serverRequests.del(`/tipo-proyectos/${id}`)
}

const Rubro = {
  getAll: () => serverRequests.get(`/rubros`),
  get: id => serverRequests.get(`/rubros/${id}`),
  create: format => serverRequests.post('/rubros', format),
  update: (id, format) => serverRequests.put(`/rubros/${id}`, format),
  delete: id => serverRequests.del(`/rubros/${id}`)
}

const Prefijo = {
  getAll: () => serverRequests.get(`/prefijos`),
  get: id => serverRequests.get(`/prefijos/${id}`),
  create: format => serverRequests.post('/prefijos', format),
  update: (id, format) => serverRequests.put(`/prefijos/${id}`, format),
  delete: id => serverRequests.del(`/prefijos/${id}`)
}

const Staf = {
  getAll: () => serverRequests.get(`/stafs`),
  get: id => serverRequests.get(`/stafs/${id}`),
  create: format => serverRequests.post('/stafs', format),
  update: (id, format) => serverRequests.put(`/stafs/${id}`, format),
  delete: id => serverRequests.del(`/stafs/${id}`)
}

const Coleccion = {
  getAll: () => serverRequests.get(`/coleccions`),
  get: id => serverRequests.get(`/coleccions/${id}`),
  create: format => serverRequests.post('/coleccions', format),
  update: (id, format) => serverRequests.put(`/coleccions/${id}`, format),
  delete: id => serverRequests.del(`/coleccions/${id}`)
}

const Motivacion = {
  getAll: () => serverRequests.get(`/motivacions`),
  get: id => serverRequests.get(`/motivacions/${id}`),
  create: format => serverRequests.post('/motivacions', format),
  update: (id, format) => serverRequests.put(`/motivacions/${id}`, format),
  delete: id => serverRequests.del(`/motivacions/${id}`)
}

const Antiguedad = {
  getAll: () => serverRequests.get(`/antiguedads`),
  get: id => serverRequests.get(`/antiguedads/${id}`),
  create: format => serverRequests.post('/antiguedads', format),
  update: (id, format) => serverRequests.put(`/antiguedads/${id}`, format),
  delete: id => serverRequests.del(`/antiguedads/${id}`)
}

const CuponDescuento = {
  getAll: () => serverRequests.get(`/cupon-descuentos`),
  get: id => serverRequests.get(`/cupon-descuentos/${id}`),
  create: cupon => serverRequests.post('/cupon-descuentos', cupon),
  update: (id, cupon) => serverRequests.put(`/cupon-descuentos/${id}`, cupon),
  delete: id => serverRequests.del(`/cupon-descuentos/${id}`)
}

const Cercania = {
  getAll: () => serverRequests.get(`/cercanias`),
  get: id => serverRequests.get(`/cercanias/${id}`),
  create: cercania => serverRequests.post('/cercanias', cercania),
  update: (id, cercania) => serverRequests.put(`/cercanias/${id}`, cercania),
  delete: id => serverRequests.del(`/cercanias/${id}`)
}

const Origen = {
  getAll: () => serverRequests.get(`/origens`),
  get: id => serverRequests.get(`/origens/${id}`),
  create: origen => serverRequests.post('/origens', origen),
  update: (id, origen) => serverRequests.put(`/origens/${id}`, origen),
  delete: id => serverRequests.del(`/origens/${id}`)
}

const Acuerdo = {
  getAll: () => serverRequests.get(`/acuerdos`),
  get: id => serverRequests.get(`/acuerdos/${id}`),
  create: acuerdo => serverRequests.post('/acuerdos', acuerdo),
  update: (id, acuerdo) => serverRequests.put(`/acuerdos/${id}`, acuerdo),
  delete: id => serverRequests.del(`/acuerdos/${id}`)
}

const TipoArchivo = {
  getAll: () => serverRequests.get(`/tipo-archivos`),
  get: id => serverRequests.get(`/tipo-archivos/${id}`),
  create: format => serverRequests.post('/tipo-archivos', format),
  update: (id, format) => serverRequests.put(`/tipo-archivos/${id}`, format),
  delete: id => serverRequests.del(`/tipo-archivos/${id}`)
}

const TecnicaArtistica = {
  getAll: () => serverRequests.get(`/tecnica-artisticas`),
  get: id => serverRequests.get(`/tecnica-artisticas/${id}`),
  create: tecnica => serverRequests.post('/tecnica-artisticas', tecnica),
  update: (id, tecnica) =>
    serverRequests.put(`/tecnica-artisticas/${id}`, tecnica),
  delete: id => serverRequests.del(`/tecnica-artisticas/${id}`)
}

const API = {
  Acuerdo,
  Antiguedad,
  Archivo,
  Area,
  AudienceState,
  Audiencia,
  Auth,
  Cercania,
  Coleccion,
  CuponDescuento,
  EstadoProyecto,
  Formato,
  Motivacion,
  Origen,
  Prefijo,
  Proyecto,
  PublicoObjetivo,
  Rubro,
  ServiceState,
  Servicio,
  Staf,
  StaffState,
  Tag,
  TecnicaArtistica,
  TipoArchivo,
  TipoProyecto,
  User,
  getToken,
  setToken
}

export default API
