import React, { useState } from "react";

const Button = ({ value, setValue, name }) => {
    const setNumber = () => {
        setValue(value + 1);
    };

    return (
        <div>
            <button onClick={setNumber}>{name}</button>
        </div>
    );
};

const StatisticLine = ({text, value}) => (
  <div>
    <p>{text} {value}</p>
  </div>
)

const Statistics = ({feedback}) => {
  const calculateAll = () => feedback.good + feedback.neutral + feedback.bad

  const calculateAverage = () => {
    let total = feedback.good - feedback.bad
    return total/calculateAll()
  }
  if(feedback.good === 0 && feedback.neutral === 0 && feedback.bad === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <StatisticLine text="good" value={feedback.good}/>
      <StatisticLine text="neutral" value={feedback.neutral}/>
      <StatisticLine text="bad" value={feedback.bad}/>
      <StatisticLine text="all" value={calculateAll()}/>
      <StatisticLine text="average" value={calculateAverage()}/>
    </div>
  )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>
                <Button value={good} setValue={setGood} name="good" />
                <Button value={neutral} setValue={setNeutral} name="neutral" />
                <Button value={bad} setValue={setBad} name="bad" />
              <h1>statistics</h1>
            <Statistics feedback={{good:good,neutral:neutral,bad:bad}}/>
        </div>
    );
};

export default App;
