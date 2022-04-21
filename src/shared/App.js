import { ConnectedRouter } from 'connected-react-router';
import React, { useEffect } from 'react';
import { history } from '../redux/configureStore';
import { Route } from 'react-router-dom';
import { Login, Signup, Main, PostWrite, Detail } from '../pages';
import SearchPage from '../pages/SearchPage';
import Header from '../shared/Header';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreator as userActions } from '../redux/modules/user';

function App() {
  const dispatch = useDispatch();

  const is_token = localStorage.getItem('token') ? true : false;
  console.log(is_token);
  useEffect(() => {
    if (is_token) {
      dispatch(userActions.isLoginDB());
    }
  }, []);

  const is_login = useSelector((state) => state?.user);
  console.log(is_login);

  if (is_login && is_token) {
    return (
      <>
        <Header />
        <ConnectedRouter history={history}>
          <Route path='/' exact component={Main} />
          <Route path='/search/:id' exact component={SearchPage} />
          <Route path='/postWrite/' exact component={PostWrite} />
          <Route path='/postWrite/:postNum' exact component={PostWrite} />
          <Route path='/detail/:postNum' exact component={Detail} />
        </ConnectedRouter>
      </>
    );
  } else {
    return (
      <>
        <Header />
        <ConnectedRouter history={history}>
          <Route path='/login' exact component={Login} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/' exact component={Main} />
          <Route path='/search/:id' exact component={SearchPage} />
          <Route path='/postWrite/' exact component={PostWrite} />
          <Route path='/postWrite/:postNum' exact component={PostWrite} />
          <Route path='/detail/:postNum' exact component={Detail} />
        </ConnectedRouter>
      </>
    );
  }
}

export default App;
