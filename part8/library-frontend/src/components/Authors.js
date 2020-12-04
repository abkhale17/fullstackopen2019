  
import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client';
import { ALL_AUTHORS, UPDATE_BORN } from '../queries'

const Authors = (props) => {
  var name
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
    var selection = document.getElementById('selectAuthor')
    for(let i=0; i<selection.length; i++){
      if(selection[i].selected) {
        name = selection[i].value
      }
    }
    editBorn({ variables: { name, born } })
    name = ''
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
        {
          props.token
          ? <form onSubmit={submit}>
              <div>
                Choose Author
                <select id='selectAuthor'>
                  {
                    authors.map((author, idx) => 
                      <option key={idx} value={author.name}>{author.name}</option>
                    )
                  }
                </select>
              </div>
              <div>
                born
                <input type='number' value={born} onChange={({ target }) => setBorn(parseInt(target.value))}/>
              </div>
              <button type='submit'>Update</button>
          </form>
        : <p style={{fontStyle:'italic'}}>Login to edit the author</p>
        }
      </div>
    </div>
  )
}

export default Authors
