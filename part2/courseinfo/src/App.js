import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  )
}

const Part = ({part, exercise}) => {
  return(
    <div>
      <p>
        {part} {exercise}
      </p>
    </div>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part.name} exercise={part.exercises}/>)}
      
    </div>
  )
}

const Total = ({parts}) => {
  const courseSum = parts.reduce((current, exercise) => current + exercise.exercises, 0)

  return (
    <div>
      <p>Number of exercises {courseSum}</p>
    </div>
  )
}

const Course = (props) => {
  
  return(
    <div>
      <Header course={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App