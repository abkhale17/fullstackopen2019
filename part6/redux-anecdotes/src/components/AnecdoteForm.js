import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`New anecdote '${content}' is added!`, 5)
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)