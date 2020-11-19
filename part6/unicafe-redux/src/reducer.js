const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return {
        ...initialState,
        good: initialState.good+1
      }
    case 'OK':
      return {
        ...initialState,
        ok: initialState.ok+1
      }
    case 'BAD':
      return {
        ...initialState,
        bad: initialState.bad+1
      }
    case 'ZERO':
      return {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: 
      return state
  }
  
}

export default counterReducer