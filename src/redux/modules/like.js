import axios from 'axios'
import produce, { produceWithPatches } from 'immer'
import { createAction, handleActions } from 'redux-actions'

const BASE_URL = 'http://3.34.98.31'

//action
const IS_LIKE = 'IS_LIKE'
const UN_LIKE = 'UN_LIKE'
const GET_SUBS = 'GET_SUBS'

//actionCreator
const isLike = createAction(IS_LIKE, (isLike, likeNum) => ({ isLike, likeNum }))
const unLike = createAction(UN_LIKE, (un_like) => ({ un_like }))
const getSubs = createAction(GET_SUBS, (list) => ({ list }))

const initialState = {
  isLike: false,
  isUnlike: false,
  isSub: false,
}

//Middle Wares
const isLikeDB = (postNum, likeCheck, unlikeCheck, likeNum) => {
  console.log(postNum, likeCheck, unlikeCheck)
  console.log(
    '현재 좋아요 상태!: ',
    likeCheck,
    '현재 싫어요 상태!: ',
    unlikeCheck,
  )

  return async function (dispatch, getState, { history }) {
    await axios
      .post(
        `${BASE_URL}/api/like?postNum=${postNum}`,
        JSON.stringify({
          likeCheck: likeCheck,
          unlikeCheck: unlikeCheck,
        }),
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        const _like = res.data.result
        console.log(_like)
        if (_like) {
          likeNum += 1
        } else {
          likeNum -= 1
        }

        dispatch(isLike({ _like, likeNum }))
      })
      .catch((err) => {
        console.log('좋아요 실패ㅜ', err)
      })
  }
}

const unlikeDB = (postNum, likeCheck, unlikeCheck) => {
  console.log(postNum, likeCheck, unlikeCheck)
  console.log(
    '현재 좋아요 상태!: ',
    likeCheck,
    '현재 싫어요 상태!: ',
    unlikeCheck,
  )
  return async function (dispatch, getState, { history }) {
    console.log('test')
    await axios
      .post(
        `${BASE_URL}/api/unlike?postNum=${postNum}`,
        JSON.stringify({
          likeCheck: likeCheck,
          unlikeCheck: unlikeCheck,
        }),
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        const _unlike = res.data.result
        dispatch(unLike(_unlike))
      })
      .catch((err) => {
        console.log('싫어요 실패', err)
      })
  }
}

const getSubsDB = (userSub, subCheck) => {
  console.log('현재 구독 상태! ', subCheck)
  console.log(userSub, subCheck)
  return async function (dispatch, getState, { history }) {
    await axios
      .post(
        `${BASE_URL}/api/subscribe`,
        JSON.stringify({
          userSub: userSub,
          subCheck: subCheck,
        }),
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        console.log(res)
        const _sub = res.data.result
        dispatch(getSubs(_sub))
      })
      .catch((err) => {
        console.log('에ㅔ러', err)
      })
  }
}

//Reducer
export default handleActions(
  {
    [IS_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const { isLike, likeNum } = action.payload
        draft.isLike = isLike
      }),
    [UN_LIKE]: (state, action) =>
      produce(state, (draft) => {
        console.log('언제하냐....')
      }),
    [GET_SUBS]: (state, action) =>
      produce(state, (draft) => {
        console.log('휴.....')
      }),
  },
  initialState,
)

const actionCreators = {
  isLikeDB,
  unlikeDB,
  getSubsDB,
}

export { actionCreators }
