import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error)
    }
  })

  useEffect(() => {
    if(result.data) {
      const res = result.data.login
      const token = res.value
      const fgenre = res.fgenre
      setToken(token)
      localStorage.setItem('user-token', token)
      localStorage.setItem('favGenre', fgenre)
    }
  }, [result.data])

  if (!show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()

    login({ variables: { username, password } })
    document.getElementById('authorsBTN').click()
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm