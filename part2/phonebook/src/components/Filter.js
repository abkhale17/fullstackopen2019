import React from 'react'
import '../index.css'

function Filter(props){
  const {handleChange}=props

  // console.log(props.filteredList)
  // console.log(tempFilt)
  return (
  <div className='Filtered'>
    <div>
      filter shown with <input                 
                          onChange={handleChange}
                        />
      </div>

      { 
        props.filteredList.map(
          person => <li key={person.id}>{person.name} {person.number}</li>
          )
      }

    </div>
  )
}

export default Filter
