import axios from 'axios'

const server = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT
})

let token = null

const tokenInterceptor = config => {
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
}

const setToken = _token => {
  token = _token
}

const responseBody = response => response.data

server.interceptors.request.use(tokenInterceptor, error =>
  Promise.reject(error)
)

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
  delete: id => serverRequests.del(`/archivos/${id}`)
}

const Audiencia = {
  getAll: () => serverRequests.get(`/audiencias`),
  get: id => serverRequests.get(`/audiencias/${id}`),
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

const Rubro = {
  getAll: () => serverRequests.get(`/rubros`),
  get: id => serverRequests.get(`/rubros/${id}`),
  create: format => serverRequests.post('/rubros', format),
  update: (id, format) => serverRequests.put(`/rubros/${id}`, format),
  delete: id => serverRequests.del(`/rubros/${id}`)
}

const API = {
  Auth,
  User,
  Area,
  Tag,
  Rubro,
  Archivo,
  Proyecto,
  Audiencia,
  Servicio,
  Formato,
  AudienceState,
  ServiceState,
  PublicoObjetivo,
  setToken
}

export default API
