import userService from '../services/users'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'ALL_USERS':
      console.log(action.data,'action.data')
      return action.data
    default:
      return state
  }
}

export const initializeUserList = () => {
  return async dispatch => {
    const data = await userService.getAll()
    console.log(data,'data')
    dispatch({
      type: 'ALL_USERS',
      data
    })
  }
}

export default reducer