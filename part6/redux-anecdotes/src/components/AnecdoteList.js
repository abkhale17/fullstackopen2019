import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { notifyVote } from '../reducers/notificationReducer'
import { show, hide } from '../reducers/removeNotificationReducer'

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
    dispatch(incrementVote(anecdote.id))
    dispatch(notifyVote(anecdote.content))
    dispatch(show())
    setTimeout(() => {
      dispatch(hide())
    }, 5000)
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