const reducer = (state = null, action) => {
  switch(action.type) {
    case 'LOGGED_USER':
      return action.user
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const loggedUser = (user) => {
  return {
    type: 'LOGGED_USER',
    user
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}

export default reducer