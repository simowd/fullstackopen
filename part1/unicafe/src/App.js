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

const Content = ({feedback}) => {
  return(
    <div>
      <p> good {feedback.good}</p>
      <p> neutral {feedback.neutral}</p>
      <p> bad {feedback.bad}</p>
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
            <Content feedback={{good:good,neutral:neutral,bad:bad}}/>
        </div>
    );
};

export default App;
