import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { history } from '../redux/configureStore';
import { Route } from 'react-router-dom';
import { Login, Signup, Main, PostWrite, Detail } from '../pages';
import Post from '../components/Post';

function App() {
  return (
    <>
      <div className='App'>
        <ConnectedRouter history={history}>
          <Route path='/' exact component={Main} />
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/postWrite' exact component={PostWrite} />
          <Route path='/post/5' exact component={Post} />
          <Route path='/postWrite/:postNum' exact component={PostWrite} />
          <Route path='/watch/5' exact component={Detail} />
        </ConnectedRouter>
      </div>
    </>
  );
}

export default App;
