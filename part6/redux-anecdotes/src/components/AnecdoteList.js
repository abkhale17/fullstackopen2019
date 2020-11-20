import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { notifyVote } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const newState = [...state.anecdote]
    newState.sort( (a, b) => b.votes - a.votes)
    return newState
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(incrementVote(id))
    dispatch(notifyVote(id))
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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}
  
export default AnecdoteList