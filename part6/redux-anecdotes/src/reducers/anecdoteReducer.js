import anecdoteService from '../services/anecdoteServices'

export const incrementVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (data) => {
  return {
    type: 'ANECDOTE',
    data
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANICDOTES',
      data: anecdotes
    })
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