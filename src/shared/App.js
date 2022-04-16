import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { useSelector } from 'react-redux'
import { history } from '../redux/configureStore'
import { Route } from 'react-router-dom'
import { Login, Signup, Main, PostWrite } from '../pages'
import Header from './Header'
import { getToken } from './Token'

function App() {
  const token = getToken ? true : false
  const is_login = useSelector((state) => state.user.is_login)

  if (is_login && token) {
    return (
      <>
        <Header />
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
          <Route path="/write" exact component={PostWrite} />
        </ConnectedRouter>
      </>
    )
  }
  return (
    <>
      {/* <Header /> */}
      <ConnectedRouter history={history}>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Main} />
        <Route path="/write" exact component={PostWrite} />
      </ConnectedRouter>
    </>
  )
}

export default App
