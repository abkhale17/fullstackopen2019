import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loggedUser } from '../reducers/userReducer'
import storage from '../utils/storage'
import Notification from './Notification'
import loginService from '../services/login'
import { Button, TextField, Container } from '@material-ui/core'

const LoginForm = ({ notifyWith }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(loggedUser(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch (exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  return (
    <Container>
      <div>
          <h2>login to application</h2>

          <Notification />

          <form onSubmit={handleLogin}>
            <div>
              <TextField 
                label='username'
                variant="outlined"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
              />
            </div>
            <br/>
            <div>
              <TextField
                label='password'
                variant="outlined"
                type='password'
                value={password}
                onChange={({ target }) => setPassword(target.value)}
              />
            </div>
            <br/>
            <div>
              <Button variant="contained" color="primary" type="submit">
                login
              </Button>
            </div>
          </form>
        </div>
      </Container>
  )
}

export default LoginForm