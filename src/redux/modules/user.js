// REDUX-ACTION & IMMER
import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'

//Axios
import axios from 'axios'

import { setToken, getToken, removeToken } from '../../shared/Token'
import { create } from 'lodash'

//나중에 axios module로 뺄 것
const BASE_URL = 'http://3.34.98.31'

//ACTION
const LOG_IN = 'LOG_IN'
const LOG_OUT = 'LOG_OUT'
const SIGN_UP = 'SIGN_UP'
const SET_USER = 'SET_USER'

//ACTION CREATORS
const logIn = createAction(LOG_IN, (token, user) => ({ token, user }))
const signUp = createAction(SIGN_UP, (user) => ({ user }))
const logOut = createAction(LOG_OUT, (user) => ({ user }))
const setUser = createAction(SET_USER, (user) => ({ user }))

//InitialState
const initialState = {
  user: null,
  is_login: false,
}

//MIDDLE WARES

//회원가입 API 받으면 테스트~
const signupDB = (dic) => {
  return async function (dispatch, getState, { history }) {
    //변수 재할당
    const { id: userId, pw: userPw, nick: userNick } = dic
    console.log(userId, userPw, userNick)

    await axios
      .post(
        `${BASE_URL}/user/signup`,
        JSON.stringify({
          userId: userId,
          userPw: userPw,
          userNick: userNick,
        }),
        { headers: { 'Content-Type': `application/json` } },
      )
      .then((res) => {
        console.log(res.data)
        dispatch(signUp())
        history.replace('/login')
      })
      .catch((error) => {
        console.log('에러에러', error)
      })
  }
}

// 로그인 API 받으면 테스트 할 것
const loginDB = (dic) => {
  return async function (dispatch, getState, { history }) {
    const { id: userId, pw: userPw } = dic
    await axios
      .post(`${BASE_URL}/user/login`, JSON.stringify({ userId, userPw }), {
        headers: { 'Content-Type': `application/json` },
      })
      //토큰 받아서 로컬스토리지에 저장!
      .then((res) => {
        console.log(res)
        if (res.data.loginToken) {
          console.log(res)
          const accessToken = res.data.loginToken
          localStorage.setItem('token', accessToken)
          dispatch(logIn(accessToken))
          history.replace('/')
        }
      })
      .catch((error) => {
        console.log('에러에러', error)
      })
  }
}
//islogin
const isLoginDB = () => {
  return async function (dispatch, getState, { history }) {
    await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer${localStorage.getItem('token')}`,
      },
      method: 'get',
      url: `${BASE_URL}/user/islogin`,
    })
      .then((res) => {
        console.log(res)
        dispatch(
          setUser({
            userId: res.data.user.userId,
            userNick: res.data.user.userNick,
            userProfile: res.data.user.userProfile,
            userSubscribe: res.data.user.userSubscribe,
          }),
        )
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

//로그아웃
const logOutDB = (user) => {
  return async function (dispatch, getState, { history }) {
    console.log(history)
    removeToken()
    dispatch(logOut(user))
    alert('로그아웃 되었습니다')
    history.replace('/login')
  }
}

//REDUCER
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user
        draft.token = action.payload.token
        draft.is_login = true
      }),
    [SIGN_UP]: (state, action) => produce(state, (draft) => {}),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        localStorage.removeItem('token')
        draft.is_login = false
        draft.user = null
      }),
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user
        draft.is_login = true
      }),
  },
  initialState,
)
const actionCreator = {
  logIn,
  logOut,
  signUp,
  loginDB,
  signupDB,
  logOutDB,
  isLoginDB,
}

export { actionCreator }
