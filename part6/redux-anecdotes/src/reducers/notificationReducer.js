export const setNotification = (notification, time) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, time*1000)
    dispatch({
      type: 'NOTIFY',
      data: notification
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR'
  }
}

const notificationReducer = (state = { message:'', display: 'none' }, action) => {
  switch(action.type) {
    case 'NOTIFY':
      return { message: action.data, display: 'block'}

    case 'CLEAR':
      return { message:'', display: 'none' }

    default:
      return state
  }
}

export default notificationReducer