import feathers from '../utils/feathers'

const api = {}

export const extractData = (response) => {
  if (response.data) {
    return response.data
  }

  return response
}

api.service = (service, method, { ...params } ) => (
  feathers.service(service)[method](...params)
  .then(extractData)
)

api.login = (username, password) => (
  feathers.authenticate({
    type: 'local',
    username: username,
    password: password
  })
)

api.authenticate = () => (
  feathers.authenticate()
)

export default api
