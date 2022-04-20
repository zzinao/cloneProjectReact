import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import axios from 'axios'
import moment from 'moment'
import { create } from 'lodash'

const BASE_URL = 'http://3.34.98.31'

const SET_COMMENT = 'SET_COMMENT'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const UPDATE_COMMENT = 'UPDATE_COMMENT'

const setComment = createAction(SET_COMMENT, (list) => ({
  list,
}))

const addComment = createAction(ADD_COMMENT, (comment) => ({
  comment,
}))

const deleteComment = createAction(DELETE_COMMENT, (commentNum, postNum) => ({
  commentNum,
  postNum,
}))

const updateComment = createAction(UPDATE_COMMENT, (commentNum, comment) => ({
  commentNum,
  comment,
}))

const initialState = {
  list: [],
}

const initialComment = [
  {
    commentDate: moment().format('YYYY-MM-dd hh:mm:ss'),
    commentNum: 3,
    contents: '댓글',
    postNum: 1,
    // userId: '야이디',
    // userInfo: {
    // userId: '아이디',
    // userPw: '',
    userNick: '닉네임',
    userProfile: '',
    // userSubscribe: 100,
    // },
  },
]
//MIDDLE WARES
const addCommentDB = (contents, postNum) => {
  console.log(contents, postNum)
  let list = {
    ...initialComment,
  }
  list[0].postNum = postNum
  list[0].contents = contents

  return async function (dispatch, getState, { history }) {
    await axios
      .post(
        `${BASE_URL}/api/comments?postNum=${postNum}`,
        JSON.stringify({
          contents: contents,
        }),
        {
          headers: {
            'Content-Type': `application/json`,
            Authorization: `Bearer${localStorage.getItem('token')}`,
          },
        },
      )
      .then((res) => {
        console.log(list)
        dispatch(addComment(list))
      })
      .catch((err) => {
        console.log('게시물작성실패', err)
      })
  }
}

const getCommentDB = (postNum) => {
  return async function (dispatch, getState, { history }) {
    await axios({
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer${localStorage.getItem('token')}`,
      },
      method: 'get',
      url: `${BASE_URL}/api/posts?postNum=${postNum}`,
    })
      .then((res) => {
        let DescentedOrder = [...res.data.comments].sort((a, b) => {
          return new Date(b.postDate) - new Date(a.postDate)
        })
        let comment_list = []
        //정렬
        DescentedOrder.forEach((comment) =>
          comment_list.push({
            commentDate: comment.commentDate,
            commentNum: comment.commentNum,
            contents: comment.contents,
            userNick: comment.userInfo.userNick,
            userProfile: comment.userInfo.userProfile,
          }),
        )
        // console.log(res.data)
        dispatch(setComment(comment_list))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const updateCommentDB = (contents, commentNum) => {
  console.log(contents)
  return async function (dispatch, getState, { history }) {
    await axios
      .post(
        `${BASE_URL}/api/comments?commentNum=${commentNum}`,
        JSON.stringify({
          contents: contents,
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
        dispatch(updateComment())
      })
      .catch((err) => {
        console.log('에러', err)
      })
  }
}

const deleteCommentDB = (commentNum) => {
  console.log(commentNum)
  return async function (dispatch, getState, { history }) {
    await axios({
      method: 'DELETE',
      url: `${BASE_URL}/api/comments?commentNum=${commentNum}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer${localStorage.getItem('token')}`,
      },
    }).then((res) => {
      console.log(res)
      dispatch(deleteComment(commentNum))
    })
  }
}

//REDUCER

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = [{ ...action.payload.comment }, ...draft.list]
      }),

    [UPDATE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        const newContent = action.payload
      }),

    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        let list = draft.list.filter(
          (comment) => comment.commentNum !== action.payload.commentNum,
        )
        draft.list = [...list]
      }),
  },
  initialState,
)

export const commentActions = {
  addCommentDB,
  getCommentDB,
  deleteCommentDB,
}
