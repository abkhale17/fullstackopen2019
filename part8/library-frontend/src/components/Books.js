import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [shouldFilter, setShouldFilter] = useState(false)
  const [filterBy, setFilterBy] = useState(null)

  const results = useQuery(ALL_BOOKS)
  if (!props.show) {
    return null
  }

  const filterIt = (genre) => {
    setShouldFilter(true)
    setFilterBy(genre)
  }

  const books = results.data.allBooks
  const listGenres = books.map(book => book.genres).flat()
  const uniqueGenre = [...new Set(listGenres)]

  return (
    <div>
      <div>
        <h2 style={{display:'inline-block', marginRight:'10px'}}>books</h2>
        <button onClick={() => {setShouldFilter(false);setFilterBy(null)}}>ALL</button>
      </div>
      <div>
        {
          uniqueGenre.map((genre, idx) =>  <button key={idx} onClick={() => filterIt(genre)}>{genre}</button> )
        }
      </div>
      <p>Books filtered by Genre: <strong>{ shouldFilter ? filterBy : 'click on genres to filter' }</strong></p>
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
            books.map(a =>  {
              if(shouldFilter) {
                if(a.genres.includes(filterBy)) {
                  return (
                    <tr key={a.title}>
                      <td>{a.title}</td>
                      <td>{a.author.name}</td>
                      <td>{a.published}</td>
                    </tr>
                  )
                }
                return null
              }
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

export default Books