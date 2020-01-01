
import React from 'react'
import '../index.css'

const Person = (props, deletePerson) => {
    return (
      <li>{props.name}  {props.number} <button className='DelBtn' onClick={props.deletePerson}>delete</button></li>
    )
  }

  export default Person