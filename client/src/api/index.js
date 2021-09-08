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
  del: url => server.delete(`${url}`).then(responseBody),
  get: url => server.get(`${url}`).then(responseBody),
  put: (url, body) => server.put(`${url}`, body).then(responseBody),
  post: (url, body) => server.post(`${url}`, body).then(responseBody)
}

const Auth = {
  login: user => serverRequests.post('/auth/local', user),
  loginGoogle: user => serverRequests.post('/login/google', user),
  register: user => serverRequests.post('/auth/local/register', user)
}

const Project = {
  getAll: () => serverRequests.get(`/proyectos`),
  get: id => serverRequests.get(`/proyectos/${id}`),
  create: project => serverRequests.post('/proyectos', project),
  update: (id, project) => serverRequests.put(`/proyectos/${id}`, project),
  delete: id => serverRequests.del(`/proyectos/${id}`)
}

const Service = {
  getAll: () => serverRequests.get(`/servicios`),
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

const Audience = {
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

const API = {
  Auth,
  User,
  Area,
  Tag,
  Project,
  Audience,
  Service,
  setToken
}

export default API
