import React from 'react'
import { connect } from 'react-redux'
import { filterHandler } from '../reducers/filterReducer'

const Filter = (props) => {
  const handleChange = (event) => {
    const search = event.target.value.toLowerCase()
    props.filterHandler(search)
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

const mapDispatchToProps = {
  filterHandler
}
export default connect(null, mapDispatchToProps)(Filter)
