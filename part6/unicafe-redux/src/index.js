import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const dispatcher = (type) => {
    const handler = () => {
      store.dispatch({
        type
      })
    }
    return handler
  }

  return (
    <div>
      <button onClick={dispatcher('GOOD')}>good</button> 
      <button onClick={dispatcher('OK')}>ok</button> 
      <button onClick={dispatcher('BAD')}>bad</button>
      <button onClick={dispatcher('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)