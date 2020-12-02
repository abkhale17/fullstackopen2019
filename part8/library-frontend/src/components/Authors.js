  
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, UPDATE_BORN } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editBorn ] = useMutation(UPDATE_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => { console.log(error) }
  })

  const result = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }
  if(result.loading) {
    return <div>...Loading!</div>
  }
  const authors = result.data.allAuthors

  const submit = (e) => {
    e.preventDefault()

    editBorn({ variables: { name, born } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Set Birth Year</h2>
        <form onSubmit={submit}>
          <div>
            name
            <input type='text' onChange={({ target }) => setName(target.value)}/>
          </div>
          <div>
            born
            <input type='number' onChange={({ target }) => setBorn(parseInt(target.value))}/>
          </div>
          <button type='submit'>Update</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
