import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
})

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))

store.subscribe(() => {
  console.log(store.getState(),'getState')
})

export default store