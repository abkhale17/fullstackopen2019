import React, { useState , useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import services from './services/persons_2'
import './index.css'


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName,   setNewName ] = useState('')
  const [ newNumber, setNewNumber  ] = useState('') 
  const [ filteredNumbers,  setfilteredNumbers] = useState([])
  const [ errorMessage, setErrorMessage] = useState(null);
  const [ notification, setNotification] = useState(null);

  var updatedObj={}

  useEffect(()=>{
    services
    .getAll()
    .then((response)=>{
      setPersons(response)
    })
  },[])

  const addName = (event) =>{ 
    setNewName(event.target.value)
  }
  const addNumber = (event) => {
    setNewNumber(event.target.value)
  }

  function setInput(event) { 
    const filt= event.target.value.toLowerCase()
    if (filt==='')  {
      setfilteredNumbers([])
      return
    }
   
  const  filteredNumbers = persons.filter(function(person){
      var curName= person.name.toLowerCase()
      var result = curName.includes(filt)
      if (!result) {      
        return null
      } 
      return person
    })
    setfilteredNumbers(filteredNumbers)
  }
  

  const ifContactExists = (newName) => {
    for(var i=0;i<persons.length;i++){ 
      if (persons[i].name === newName){ 
        updatedObj={...persons[i],number:newNumber} //only update number,keep id intact
        return true
      }
    }
    return false
  }

  const confirmWindow= (updatedObj)=>{
    if(window.confirm(`${updatedObj.name} is already added to phonebook, replace the old number with a new one?`))
      { 
        services
        .update(updatedObj)
        .then((response)=>{
            setPersons(persons.map(person=>person.name !== updatedObj.name? person : response))
            setNotification(`updated ${newName}`)
            setTimeout(()=>{
              setNotification(null)
            },2000)
          })
        .catch(error=>{
          setErrorMessage(`Information of ${newName} is already been removed from server`)

          console.log('error in confirmWindow')
        })
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
        
      }
    }

  const addPerson = (event) => {
    event.preventDefault()   
    
    ifContactExists(newName) ?
      confirmWindow(updatedObj)
      :
      services
          .create({
            name  : newName,
            number: newNumber,
             id   : Math.floor(Math.random() * 1000) + persons.length
          })
          .then(response=>{
            setPersons(persons.concat(response))
            setNotification(`added ${newName}`)
            setTimeout(()=>{
              setNotification(null)
            },2000)
          })
          .catch(error => {
            console.log('in add person')
          })

    setNewName('')
    setNewNumber('')    
  }

  const handleDeletePerson = (name, id) => {
    return () => {
      if (window.confirm(`Delete ${name} ?`)) {
        services
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter(n => n.id !== id))
            setNotification(`Deleted ${name}`)
            setTimeout(()=>{
              setNotification(null)
            },2000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setPersons(persons.filter(n => n.name !== name));
            setErrorMessage(`Information of ${name} is already been removed from server`);
          });
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      }
    }
  }

  return (
    <div>
      <h1>Phonebook</h1><br/>
      <Notification message={notification} error={errorMessage}/>
      <Filter filteredList={filteredNumbers} handleChange={setInput}/>
      
        
      <form onSubmit={addPerson}>
        <h2>add a new</h2>
        <PersonForm  values={[newName,newNumber]} handleChange={[addName,addNumber]}/>
        <button className='addBtn' type="submit">add</button>
        
      </form>
      <h2>Numbers </h2>
      <Persons 
        persons={persons} 
        handleDeletePerson={handleDeletePerson}
      />
      
    </div>
  )
}
export default App
