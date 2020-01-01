import React from 'react'
import Person from './Person'
// import axios from 'axios'

const Persons = (props) => {

      return (
        <div>
          {
           props.persons.map(
              person => 
                <Person key={person.id} name={person.name} number={person.number} deletePerson={props.handleDeletePerson(person.name, person.id)} />      
            )   
          }
        </div>
        )
   
  
}
export default Persons