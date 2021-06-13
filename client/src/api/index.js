import axios from 'axios'
const API_ROOT = 'http://ec2-13-58-59-70.us-east-2.compute.amazonaws.com:1337'

const server = axios.create({
  baseURL: API_ROOT
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

const Ticket = {
  getAll: () => serverRequests.get(`/tickets`),
  get: id => serverRequests.get(`/tickets/${id}`),
  create: account => serverRequests.post('/tickets', account),
  update: account => serverRequests.put(`/tickets/${account._id}`, account),
  delete: id => serverRequests.del(`/tickets/${id}`)
}

const Service = {
  getAll: () => serverRequests.get(`/services`),
  get: id => serverRequests.get(`/services/${id}`),
  create: account => serverRequests.post('/services', account),
  update: account => serverRequests.put(`/services/${account._id}`, account),
  delete: id => serverRequests.del(`/services/${id}`)
}

const User = {
  getAll: () => serverRequests.get(`/user`),
  get: id => serverRequests.get(`/user/${id}`),
  profile: () => serverRequests.get('/profile'),
  delete: id => serverRequests.del(`/user/${id}`),
  update: user => serverRequests.put(`/user/${user._id}`, user)
}

const API = {
  Auth,
  User,
  Ticket,
  Service,
  setToken
}

export default API
