import axios from 'axios'

const server = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT
})

let token = null

const tokenInterceptor = config => {
  if (token) {
    config.headers['token'] = token
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
  login: user => serverRequests.post('/login', user),
  loginGoogle: user => serverRequests.post('/login/google', user),
  register: user => serverRequests.post('/user', user)
}

const Project = {
  getAll: () => serverRequests.get(`/proyectos`),
  get: id => serverRequests.get(`/proyectos/${id}`),
  create: project => serverRequests.post('/proyectos', project),
  update: project => serverRequests.put(`/proyectos/${project._id}`, project),
  delete: id => serverRequests.del(`/proyectos/${id}`)
}

const Service = {
  getAll: () => serverRequests.get(`/servicios`),
  get: id => serverRequests.get(`/servicios/${id}`),
  create: service => serverRequests.post('/servicios', service),
  update: service => serverRequests.put(`/servicios/${service._id}`, service),
  delete: id => serverRequests.del(`/servicios/${id}`)
}

const Audience = {
  getAll: () => serverRequests.get(`/audiencias`),
  get: id => serverRequests.get(`/audiencias/${id}`),
  create: audience => serverRequests.post('/audiencias', audience),
  update: audience => serverRequests.put(`/audiencias/${audience._id}`, audience),
  delete: id => serverRequests.del(`/audiencias/${id}`)
}

const User = {
  getAll: () => serverRequests.get(`/user`),
  profile: () => serverRequests.get('/profile'),
  get: id => serverRequests.get(`/user/${id}`),
  delete: id => serverRequests.del(`/user/${id}`),
  update: user => serverRequests.put(`/user/${user._id}`, user)
}

const API = {
  Auth,
  User,
  Project,
  Audience,
  Service,
  setToken
}

export default API
