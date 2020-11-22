import React, { useState } from 'react'
import About from './components/About'
import Anecdote from './components/Anecdote'
import AnecdoteList from './components/AnecdoteList'
import CreateNew from './components/CreateNew'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Notification from './components/Notification'
import { 
  Route, Switch,
  useRouteMatch,
  useHistory
} from 'react-router-dom'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const history = useHistory()

  const addNew = (anecdote) => {
    anecdote.id = Number((Math.random() * 10000).toFixed(0))
    setAnecdotes(anecdotes.concat(anecdote))
    history.push('/anecdotes')
    setNotification(`A new Anecdote '${anecdote.content}' created`)
    setTimeout(() => {setNotification('')}, 5000)
  }

  const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const clickedAnecdote = match 
    ? anecdotes.find((anecdote) => Number(anecdote.id) === Number(match.params.id))
    : null

  return (
    <div>
      <div>
        <h1>Software anecdotes</h1>
        <Menu/>
        <Notification notification={notification}/>
        <Switch>
          <Route exact path='/anecdotes/:id'>
            <Anecdote anecdote={clickedAnecdote}/>
          </Route>
          <Route exact path='/anecdotes'>
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
          <Route exact path='/about'>
            <About />
          </Route>
          <Route exact path='/create'>
            <CreateNew addNew={addNew} />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  )
}

export default App;
