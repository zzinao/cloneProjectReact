<<<<<<< HEAD
import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { useSelector } from 'react-redux'
import { history } from '../redux/configureStore'
import { Route } from 'react-router-dom'
import { Login, Signup, Main, PostWrite, Detail } from '../pages'
import Header from './Header'
import { getToken } from './Token'
=======
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { history } from '../redux/configureStore';
import { Route } from 'react-router-dom';
import { Login, Signup, Main, PostWrite, Detail } from '../pages';
import Post from '../components/Post';
>>>>>>> luke

function App() {
  return (
    <>
<<<<<<< HEAD
      <ConnectedRouter history={history}>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Main} />
        <Route path="/write" exact component={PostWrite} />
        <Route path="/watch" exact component={Detail} />
      </ConnectedRouter>
=======
      <div className='App'>
        <ConnectedRouter history={history}>
          <Route path='/' exact component={Main} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Signup} />
          <Route path='/postWrite' exact component={PostWrite} />
          {/* Post컴포넌트 확인용 */}
          <Route path='/post' exact component={Post} />
          <Route path='/postWrite/:num' exact component={PostWrite} />
          {/* detail에서 detail/:num으로 바꿀예정 */}
          {/* <Route path='/detail/:num' exact component={Detail} /> */}
          <Route path='/detail' exact component={Detail} />
        </ConnectedRouter>
      </div>
>>>>>>> luke
    </>
  )
}

export default App
