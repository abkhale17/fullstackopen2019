import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    let newAnecdotes = [...state.anecdote]
    if( state.filter.filterMode === 'SET_FILTER' ) {
      newAnecdotes = newAnecdotes.filter( anecdote => anecdote.content.toLowerCase().includes(state.filter.search))
    }
    const newState = [...newAnecdotes]
    newState.sort( (a, b) => b.votes - a.votes)
    return newState
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(incrementVote(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'!`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}
  
export default AnecdoteList