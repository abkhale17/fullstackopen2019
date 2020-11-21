var idArrs = []
export const setNotification = (notification, time) => {
  var timeOutId
  return async dispatch => {
    timeOutId = window.setTimeout(() => {
      dispatch(clearNotification())
    }, time*1000)
    idArrs.push(timeOutId)
    if(idArrs.length > 1) {
      window.clearTimeout(idArrs.shift())
    }
    
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