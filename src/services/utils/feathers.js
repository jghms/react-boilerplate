import feathers from 'feathers/client'
import socketio from 'feathers-socketio/client'
import hooks from 'feathers-hooks'
import rest from 'feathers-rest/client'
import errors from 'feathers-errors'
import auth from 'feathers-authentication/client'
import localStorage from 'localstorage-memory'
import io from 'socket.io-client'
import { apiBaseUrl } from '../../config'

const socket = io(apiBaseUrl);

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(hooks())
  .configure(auth({ storage: window.localStorage }))

export default feathersClient
