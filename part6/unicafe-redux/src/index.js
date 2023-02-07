import React from "react";
import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'

import reducer from './reducer'

const store = configureStore({reducer: reducer})

const App = () => {
  return (
    <>
      <button
        onClick={() => store.dispatch({ type: 'GOOD' })}
      >
        good
      </button>
      <button
        onClick={() => store.dispatch({ type: 'BAD' })}
      >
        bad
      </button>
      <button
        onClick={() => store.dispatch({ type: 'OK' })}
      >
        ok
      </button>
      <button
        onClick={() => store.dispatch({ type: 'ZERO' })}
      >
        reset stats
      </button>
      <div>
        good {store.getState().good}
      </div>
      <div>
        bad {store.getState().bad}
      </div>
      <div>
        ok {store.getState().ok}
      </div>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)