export const show = () => {
  return {
    type: 'SHOW',
    data: 'block'
  }
}

export const hide = () => {
  return {
    type: 'HIDE',
    data: 'none'
  }
}
  
  const notificationReducer = (state = 'none', action) => {
    switch(action.type) {
      case 'SHOW':
        return 'block'
      case 'HIDE':
        return 'none'
      default:
        return state
    }
  }
  
  export default notificationReducer