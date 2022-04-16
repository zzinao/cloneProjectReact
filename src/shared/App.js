import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { useSelector } from 'react-redux'
import { history } from '../redux/configureStore'
import { Route } from 'react-router-dom'
import { Login, Signup, Main, PostWrite, Detail } from '../pages'
import Header from './Header'
import { getToken } from './Token'

function App() {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Main} />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/watch" exact component={Detail} />
      </ConnectedRouter>
    </>
  )
}

export default App
