// REDUX-ACTION & IMMER
import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';

//Axios
import axios from 'axios';

import { setToken, getToken, removeToken } from '../../shared/Token';

//나중에 axios module로 뺄 것
const BASE_URL = 'http://15.164.211.148';

//InitialState
const initialState = {
  user: null,
  is_login: false,
};

//ACTION
const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';
const SIGN_UP = 'SIGN_UP';

//ACTION CREATORS
const logIn = createAction(LOG_IN, (token, user) => ({ token, user }));
const signUp = createAction(SIGN_UP, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));

//MIDDLE WARES

//회원가입 reqres로 테스트
// const signupDB = (dic) => {
//   return async function (dispatch, getState, { history }) {
//     //변수 재할당
//     const { id: userId, pw: userPw, nick: userNick } = dic
//     await axios
//       .post(`https://reqres.in/api/register`, {
//         email: userId,
//         password: userPw,
//       })
//       .then((res) => {
//         console.log(res.data)
//         dispatch(signUp())
//         history.push('/login')
//       })
//       .catch((error) => {
//         console.log('에러에러', error)
//       })
//   }
// }
//회원가입 API 받으면 테스트~
const signupDB = (dic) => {
  return async function (dispatch, getState, { history }) {
    //변수 재할당
    const { id: userId, pw: userPw, nick: userNick } = dic;
    console.log(userId, userPw, userNick);

    await axios
      .post(
        'http://15.164.211.148/user/signup',
        JSON.stringify({
          userId: userId,
          userPw: userPw,
          userNick: userNick,
        })
        // { headers: { 'Content-Type': `application/json` } },
      )
      .then((res) => {
        console.log(res.data);
        dispatch(signUp());
      })
      .catch((error) => {
        console.log('에러에러', error);
      });
  };
};

//로그인 reqres로 테스트
// const loginDB = (dic) => {
//   return async function (dispatch, getState, { history }) {
//     const { id: userId, pw: userPw } = dic
//     await axios
//       .post('https://reqres.in/api/login', {
//         email: userId,
//         password: userPw,
//       })
//       .then((res) => {
//         if (res.data.token) {
//           console.log(res)
//           const accessToken = res.data.token
//           localStorage.setItem('token', accessToken)
//           dispatch(logIn(accessToken))
//           history.push('/')
//         }
//       })
//       .catch(function (error) {
//         console.log('에러에러', error)
//       })
//   }
// }

// 로그인 API 받으면 테스트 할 것
const loginDB = (dic) => {
  return async function (dispatch, getState, { history }) {
    const { id: userId, pw: userPw } = dic;
    await axios
      .post(`${BASE_URL}/user/login`, JSON.stringify({ userId, userPw }), {
        headers: { 'Content-Type': `application/json` },
      })
      //토큰 받아서 로컬스토리지에 저장!
      .then((res) => {
        if (res.data.token) {
          console.log(res);
          const accessToken = res.data.token;
          localStorage.setItem('token', accessToken);
          dispatch(logIn(accessToken));
          history.push('/');
        }
      })
      .catch((error) => {
        console.log('에러에러', error);
      });
  };
};

//로그아웃
const logOutDB = (user) => {
  return async function (dispatch, getState, { history }) {
    console.log(history);
    removeToken();
    dispatch(logOut(user));
    alert('로그아웃 되었습니다');
    history.replace('/login');
  };
};

//REDUCER
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.token = action.payload.token;
        draft.is_login = true;
      }),
    [SIGN_UP]: (state, action) => produce(state, (draft) => {}),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem('token');
        draft.is_login = false;
        draft.user = null;
      }),
  },
  initialState
);
const actionCreator = {
  logIn,
  logOut,
  signUp,
  loginDB,
  signupDB,
  logOutDB,
};

export { actionCreator };
