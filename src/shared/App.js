import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { history } from '../redux/configureStore'
import { Route } from 'react-router-dom'
import { Login, Signup, Main, PostWrite } from '../pages'

function App() {
  return (
    <>
      <div className="App">
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Signup} />
          <Route path="/:category" exact component={PostWrite} />
        </ConnectedRouter>
      </div>
    </>
  )
}

export default App
