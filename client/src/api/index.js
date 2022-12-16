import axios from 'axios';

const server = axios.create({
  //baseURL: "http://localhost:1337/",
  baseURL: process.env.REACT_APP_API_ROOT,
});

let token = sessionStorage.getItem("colibri-token") || null;

const tokenInterceptor = (config) => {
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
};

const setToken = (_token) => {
  token = _token;
  sessionStorage.setItem("colibri-token", _token);
};

const getToken = () => {
  return token;
};

const responseBody = (response) => response.data;

server.interceptors.request.use(tokenInterceptor, Promise.reject);

const serverRequests = {
  del: (url, config) => server.delete(`${url}`, config).then(responseBody),
  get: (url, config) => server.get(`${url}`, config).then(responseBody),
  put: (url, body) => server.put(`${url}`, body).then(responseBody),
  post: (url, body) => server.post(`${url}`, body).then(responseBody),
};

const Factory = (uri, props = {}) => {
  const services = {
    getAll: (config) => serverRequests.get(`/${uri}`, config),
    count: (config) => serverRequests.get(`/${uri}/count`, config),
    get: (id) => serverRequests.get(`/${uri}/${id}`),
    create: (item) => serverRequests.post(`/${uri}`, item),
    update: (id, item) => serverRequests.put(`/${uri}/${id}`, item),
    delete: (id) => serverRequests.del(`/${uri}/${id}`),
    ...props,
  };
  return services;
};

const Auth = {
  login: (user) => serverRequests.post("/auth/local", user),
  loginGoogle: (user) => serverRequests.post("/login/google", user),
  register: (user) => serverRequests.post("/auth/local/register", user),
};

const Proyecto = Factory("proyectos", {
  start: (project) => serverRequests.post("/proyectos/start", project),
  createFolder: (id) => serverRequests.post(`/proyectos/${id}/folder`),
});

const Archivo = Factory("archivos", {
  addFiles2Entity: (id, entity, files) =>
    serverRequests.post(`/${entity}s/${id}/archivos`, files),
});

const Audiencia = Factory("audiencias", {
  dossier: (audiencia) => serverRequests.post("/audiencias/dossier", audiencia),
});

const User = Factory("user");

const Servicio = Factory("servicios", {
  upload: (values) => serverRequests.post("/servicios/upload", values)
});

const Area = Factory("areas");

const Tag = Factory("tags");

const ServiceState = Factory("estado-servicios");

const AudienceState = Factory("estado-audiencias");

const StaffState = Factory("estado-staffs");

const PublicoObjetivo = Factory("publico-objetivos");

const Formato = Factory("formatoes");

const EstadoProyecto = Factory("estado-proyectos");

const TipoProyecto = Factory("tipo-proyectos");

const Rubro = Factory("rubros");

const Tamano = Factory("tamanos");

const Prefijo = Factory("prefijos");

const Staf = Factory("stafs", {
  createNew: (staf) => serverRequests.post("/stafs/new", staf),
});

const Coleccion = Factory("coleccions");

const Motivacion = Factory("motivacions");

const Antiguedad = Factory("antiguedads");

const CuponDescuento = Factory("cupon-descuentos");

const Cercania = Factory("cercanias");

const Origen = Factory("origens");

const Organizacion = Factory("organizacions");

const Condicion = Factory("difusions");

const Ocasion = Factory("ocasions");

const Prioridad = Factory("prioridads");

const Proposito = Factory("propositos");

const Sugerencia = Factory("sugerencias");

const Difusion = Factory("difusions");

const Acuerdo = Factory("acuerdos");

const TipoArchivo = Factory("tipo-archivos");

const TecnicaArtistica = Factory("tecnica-artisticas");

const Comentarios = Factory("comentarios");

const Ciudad = Factory("ciudads");

const Region = Factory("regions");

const Pais = Factory("pais");

const Bitacora = Factory("bitacoras");

const Tarea = Factory("tareas");

const EstadoTarea = Factory("estado-tareas");

const TipoTarea = Factory("tipo-tareas");

const Sprint = Factory("sprints");

const Trayectoria = Factory("trayectorias");

const Plataforma = Factory("plataformas");

const API = {
  Acuerdo,
  Antiguedad,
  Archivo,
  Area,
  AudienceState,
  Audiencia,
  Auth,
  Cercania,
  Ciudad,
  Coleccion,
  Comentarios,
  Condicion,
  CuponDescuento,
  Difusion,
  EstadoProyecto,
  Formato,
  Motivacion,
  Ocasion,
  Organizacion,
  Origen,
  Pais,
  Prefijo,
  Prioridad,
  Proposito,
  Proyecto,
  PublicoObjetivo,
  Region,
  Rubro,
  ServiceState,
  Servicio,
  Staf,
  StaffState,
  Sugerencia,
  Tag,
  Tamano,
  TecnicaArtistica,
  TipoArchivo,
  TipoProyecto,
  User,
  getToken,
  setToken,
  Bitacora,
  Tarea,
  EstadoTarea,
  TipoTarea,
  Sprint,
  Trayectoria,
  Plataforma
};

export default API;
