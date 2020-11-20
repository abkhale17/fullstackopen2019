import anecdoteService from '../services/anecdoteServices'

export const incrementVote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: 'VOTE',
      data: { id : anecdote.id }
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch({
      type: 'ANECDOTE',
      data: newAnecdote
    })
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