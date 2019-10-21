import React from 'react'
import ReactDOM from 'react-dom'

function Part(props){
  return (
    <p>{props.part.name} {props.part.exercises}</p>
    )
  
}

const Header = (props) => {
  return (
      <h1>{props.course.name}</h1>
    )
}

function Content(props){
  return (
    <div>
      <Part part={props.course.parts[0]} />
      <Part part={props.course.parts[1]} />
      <Part part={props.course.parts[2]} />
    </div>
  )
}

function Total(props) {
  var sum=0
  for (var i = 0; i < props.course.parts.length; i++) {
        sum+=props.course.parts[i].exercises
      }
  return(
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)