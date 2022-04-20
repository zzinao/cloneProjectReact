import { ConnectedRouter } from 'connected-react-router'
import React, { useEffect } from 'react'
import { history } from '../redux/configureStore'
import { Route } from 'react-router-dom'
import { Login, Signup, Main, PostWrite, Detail } from '../pages'
import SearchPage from '../pages/SearchPage'
import Post from '../components/Post'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreator as userActions } from '../redux/modules/user'

function App() {
  const dispatch = useDispatch()

  const is_token = localStorage.getItem('token') ? true : false

  useEffect(() => {
    if (is_token) {
      dispatch(userActions.isLoginDB())
    }
  }, [])

  const is_login = useSelector((state) => state?.user)
  console.log(is_login)
  return (
    <>
      <div className="App">
        <ConnectedRouter history={history}>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/search/:searchWord" exact component={SearchPage} />
          <Route path="/postWrite/" exact component={PostWrite} />
          <Route path="/postWrite/:postNum" exact component={PostWrite} />
          <Route path="/detail/:postNum" exact component={Detail} />
        </ConnectedRouter>
      </div>
    </>
  )
}

export default App
