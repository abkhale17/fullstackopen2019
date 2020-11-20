import React from 'react'
import { useDispatch } from 'react-redux'
import { filterHandler } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const search = event.target.value.toLowerCase()
    dispatch(filterHandler(search))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
