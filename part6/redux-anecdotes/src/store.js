import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import removeNotificationReducer from './reducers/removeNotificationReducer'

const reducer = combineReducers({
  anecdote: anecdoteReducer,
  notification: notificationReducer,
  notifyDisplay: removeNotificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

export default store