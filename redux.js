import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

let reduxStore = null

// Create Root Reducer.
const rootReducer = combineReducers({
  form: formReducer
})

const isProd = process.env.NODE_ENV === 'production'

const createMiddleware = () => {
  const universalMiddleware = applyMiddleware(thunk);
  // Don't use devTools in 'production', also don't exectue until 
  // `next` is running client side code! No access to `window`!
  if (process.browser && window.devToolsExtension && !isProd) {
    return compose(universalMiddleware, window.devToolsExtension())
  }
  return universalMiddleware;
}

const getStore = initialState => {
  let store;
  // I not client side or no reduxStore yet
  if (!process.browser || !reduxStore) {
    const middleware = createMiddleware();
    store = createStore(rootReducer, initialState, middleware);
    // If still not client side
    if (!process.browser) {
      return store;
    }
    reduxStore = store
  }
  return reduxStore;
}

export default getStore;