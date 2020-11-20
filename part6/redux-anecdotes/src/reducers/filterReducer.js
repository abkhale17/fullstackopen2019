export const filterHandler = search => {
  return {
    type: 'SET_FILTER',
    search
  }
}

const filterReducer = (state = { filterMode:'ALL', search: '' }, action) => {
  switch(action.type) {
    case 'SET_FILTER':
      return { filterMode: action.type, search: action.search}
    default:
      return state
  }
}

export default filterReducer