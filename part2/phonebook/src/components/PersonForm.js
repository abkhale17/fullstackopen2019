import React from 'react'


function PersonForm(props){

  return (
    <div>
      <div>
        name:      <input 
                value={props.values[0]}
                onChange={props.handleChange[0]}
              />
      </div>
      <br />
      <div>
        number:    <input
                value={props.values[1]}
                onChange={props.handleChange[1]}
                />
      </div>
      
    </div>

  )
}
export default PersonForm