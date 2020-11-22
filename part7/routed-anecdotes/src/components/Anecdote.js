import React from 'react'

const Anecdote = ({ anecdote }) => {
  if( anecdote === undefined) {
    return <div style={{color:'red', fontWeight:'bold', margin: '20px'}}>{`{Error: Something Went Wrong, Re-check URL}`}</div>
  }
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