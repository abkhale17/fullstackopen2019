import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommend = ({ show }) => {
  const [bookLists, setBookLists] = useState(null)
  const [filterBooks, results] = useLazyQuery(ALL_BOOKS)
  const favoriteGenre = localStorage.getItem('favGenre')

  useEffect(() => {
    filterBooks({ variables: { genre: favoriteGenre } })
    if(results.data) {
      console.log(4)
      setBookLists(results.data.allBooks)
    }
  }, [results.data, favoriteGenre, filterBooks])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Book Recommendations</h2>
      <br/>
      <div>Books in your favorite genre <strong>{favoriteGenre}</strong></div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
            bookLists.map(a => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )               
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommend