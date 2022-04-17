import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import axios from 'axios'
import { create } from 'lodash'

// const BASE_URL = ""

const SET_COMMENT = 'SET_COMMENT'
const ADD_COMMENT = 'ADD_COMMENT'
const DELETE_COMMENT = 'DELETE_COMMENT'
const UPDATE_COMMENT = 'UPDATE_COMMENT'

const setComment = createAction(SET_COMMENT, (postNum, commentList) => ({
  post,
  commentList,
}))

const addComment = createAction(ADD_COMMENT, (postNum, commnet) => ({
  postNum,
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
  list: {},
}

//REDUCER

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postNum] = action.payload.commenList
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postNum].unshift(action.payload.comment)
      }),
  },
  initialState,
)

export const commentActions = {}
