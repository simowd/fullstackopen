import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1> {props.course} </h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>
        {props.part} {props.exercise}
      </p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercise}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercise}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercise}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.total}</p>
    </div>
  )
}

const App = () => {
  const part1 = {
    name: 'Fundamentals of React',
    exercise: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercise: 7
  }
  const part3 = {
    name: 'State of a component',
    exercise: 14
  }
  const course = 'Half Stack application development'
  return (
    <div>
      <Header course={course}/>
      <Content parts={[part1,part2,part3]}/>
      <Total total={part1.exercise+part2.exercise+part3.exercise}/>
    </div>
  )
}

export default App