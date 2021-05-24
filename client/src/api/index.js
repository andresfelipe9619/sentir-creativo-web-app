import axios from 'axios'
const API_ROOT = 'http://localhost:1337'

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

const Account = {
  getAll: () => serverRequests.get(`/account`),
  get: id => serverRequests.get(`/account/${id}`),
  create: account => serverRequests.post('/account', account),
  update: account => serverRequests.put(`/account/${account._id}`, account),
  delete: id => serverRequests.del(`/account/${id}`)
}

const Transaction = {
  getAll: () => serverRequests.get(`/transaction`),
  delete: id => serverRequests.del(`/transaction/${id}`),
  get: id => serverRequests.get(`/transaction/${id}`),
  update: transaction =>
    serverRequests.put(`/transaction/${transaction.id}`, transaction),
  create: transaction => serverRequests.post('/transaction', transaction)
}

const Budget = {
  getAll: () => serverRequests.get(`/budget`),
  delete: id => serverRequests.del(`/budget/${id}`),
  get: id => serverRequests.get(`/budget/${id}`),
  update: budget => serverRequests.put(`/budget/${budget._id}`, budget),
  create: budget => serverRequests.post('/budget', budget)
}

const Category = {
  getAll: () => serverRequests.get(`/category`),
  delete: id => serverRequests.del(`/category/${id}`),
  get: id => serverRequests.get(`/category/${id}`),
  update: category => serverRequests.put(`/category/${category._id}`, category),
  create: category => serverRequests.post('/category', category)
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
  Budget,
  Category,
  Account,
  Transaction,
  setToken: _token => {
    token = _token
  }
}

export default API
