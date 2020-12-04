import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommend = ({ show }) => {
  const results = useQuery(ALL_BOOKS)
  
  if (!show) {
    return null
  }

  const books = results.data.allBooks
  const favoriteGenre = localStorage.getItem('favGenre')
  const genresList = books.filter(book => book.genres.includes(favoriteGenre))

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
            genresList.map(a =>  {
              return (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )               
            }
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend