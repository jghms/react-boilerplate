import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import sagas from './sagas'

const devtools = window.devToolsExtension ? 
  window.devToolsExtension : () => fn => fn

const configureStore = (initialState = {}, services = {}) => {
  const sagaMiddleware = createSagaMiddleware()

  const enhancers = [
    applyMiddleware(
      sagaMiddleware,
    ),
    devtools(),
  ]

  const store = createStore(reducer, initialState, compose(...enhancers))
  let sagaTask = sagaMiddleware.run(sagas, services)

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextReducer = require('./reducer').default
      store.replaceReducer(nextReducer)
    })
    module.hot.accept('./sagas', () => {
      const nextSagas = require('./sagas').default
      sagaTask.cancel()
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(nextSagas, services)
      })
    })
  }

  return store
}

export default configureStore
