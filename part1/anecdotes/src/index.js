import React, { useState } from "react"
import ReactDOM from 'react-dom'


const App = (props) =>{
  const [selected, setSelected] = useState(0)
  const [votes , voteCounter ] = useState(Array(props.anecdotes.length).fill(0))

  const Counter = () => {
    const copy=[...votes]
    copy[selected]=copy[selected]+1
    voteCounter(copy) 
}

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <br/>
      {props.anecdotes[selected]}
      <br/><br/>
      has {votes[selected]} votes 
      <br/><br/>
      <button onClick={Counter}>vote</button>
      <button 
        onClick={
            ()  =>  setSelected(Math.floor(Math.random()*props.anecdotes.length))}>
            next anecdote
      </button>

      <br/>
      <h1>Anecdote with most votes</h1>
      <br/>
      {props.anecdotes[votes.indexOf(Math.max(...votes))]}
      <br/><br/>
      has {votes[votes.indexOf(Math.max(...votes))]} votes 
      
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)


