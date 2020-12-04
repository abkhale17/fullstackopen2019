import React, { useEffect, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommend = ({ show }) => {
  console.log('recommend')
  const [bookLists, setBookLists] = useState(null)
  console.log(1)
  const [filterBooks, results] = useLazyQuery(ALL_BOOKS)
  console.log(2)
  const favoriteGenre = localStorage.getItem('favGenre')
  // filterBooks({ variables: { genre: favoriteGenre } })
  console.log(3)

  useEffect(() => {
    console.log('useeffect')
    filterBooks({ variables: { genre: favoriteGenre } })
    if(results.data) {
      console.log(4)
      setBookLists(results.data.allBooks)
    }
  }, [results.data, favoriteGenre, filterBooks])
  console.log(5)
  if (!show) {
    return null
  }
  console.log('render')
  // const genresList = books.filter(book => book.genres.includes(favoriteGenre))

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