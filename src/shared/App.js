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
          <Route path='/register' exact component={Signup} />
          <Route path='/postWrite' exact component={PostWrite} />
          {/* Post컴포넌트 확인용 */}
          <Route path='/post' exact component={Post} />
          <Route path='/postWrite/:num' exact component={PostWrite} />
          {/* detail에서 detail/:num으로 바꿀예정 */}
          {/* <Route path='/detail/:num' exact component={Detail} /> */}
          <Route path='/watch' exact component={Detail} />
        </ConnectedRouter>
      </div>
    </>
  );
}

export default App;
