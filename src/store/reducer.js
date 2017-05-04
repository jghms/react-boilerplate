import camelCase from 'lodash/camelCase'
import { combineReducers } from 'redux'

const req = require.context('../components', true, /\.\/.+\/reducer\.js$/)

const reducers = {}

req.keys().forEach((key) => {
  const storeName = key.split('/').slice(-2, -1)[0]
  reducers[storeName] = req(key).default
})

export default combineReducers(reducers)
