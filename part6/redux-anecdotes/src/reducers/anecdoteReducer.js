const getId = () => (100000 * Math.random()).toFixed(0)

export const incrementVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'ANECDOTE',
    data: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANICDOTES',
    data: anecdotes
  }
}

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE': 
      const updatedState = [...state]
      return updatedState.map( anecdote => anecdote.id !== action.data.id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 })
    
    case 'ANECDOTE':
      return [...state, action.data]
    
    case 'INIT_ANICDOTES':
      return action.data
    
    default:
      return state
  }
}

export default anecdoteReducer