import React from 'react'

function Total(props) {
  const {parts} = props

  const total = parts.reduce( (total,part ) => {
    return total + part.exercises
  }, 0 )   

  return(
    <h3>total of exercises {total}</h3>
  )
}

const Part= (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
    )
  
}

const Content=(props)=>{
  const {parts} = props
  return (
    <div>{parts.map(part => <Part key={part.id} part={part} />)}</div>
  )
}


const Header = (props) => {
  return (
      <h1>{props.name}</h1>
    )
} 

function Course(props){
  const {name,parts}=props.course
  return (
  <div>
    <Header name={name} />
    <Content parts={parts}/>
    <Total  parts={parts} />
  </div>
  )
}

export default Course