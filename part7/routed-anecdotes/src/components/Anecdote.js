import React from 'react'

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>{anecdote.author}</p>
      <p>{anecdote.info}</p>
      <p>{anecdote.votes}</p>
    </div>
  )
}

export default Anecdote