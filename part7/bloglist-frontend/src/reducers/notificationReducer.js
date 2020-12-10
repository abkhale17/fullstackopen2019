const reducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.content
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const setNotification = (content, time) => (
  {
    type: 'SET_NOTIFICATION',
    content
  }
)

export const clearNotification = () => (
  { type: 'CLEAR_NOTIFICATION' }
)

export default reducer
