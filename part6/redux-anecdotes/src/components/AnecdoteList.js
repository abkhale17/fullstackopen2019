import React from 'react'
import { connect } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.incrementVote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'!`, 5)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
        {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  let newAnecdotes = [...state.anecdote]
  let sortedAnecdotes = newAnecdotes.sort((a, b) => b.votes - a.votes)
  if( state.filter.filterMode === 'ALL') {
    return {
      anecdotes : sortedAnecdotes
    }
  }
  return {
    anecdotes: sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.search))
  }
}

const mapDispatchToProps = {
  incrementVote,
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)