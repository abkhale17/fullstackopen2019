import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notifyAnecdote } from '../reducers/notificationReducer'
import { show, hide } from '../reducers/removeNotificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notifyAnecdote(content))
    dispatch(show())
    setTimeout(() => {
      dispatch(hide())
    }, 5000)
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form> 
    </div>
  )
}

export default AnecdoteForm