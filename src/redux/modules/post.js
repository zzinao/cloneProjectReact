import axios from 'axios'
import produce from 'immer'

import { createAction, handleActions } from 'redux-actions'

const BASE_URL = 'http://3.34.98.31'

//액션
const ADD_POST = 'ADD_POST'
const GET_POST = 'GET_POST'
const GETONE_POST = 'GETONE_POST'
const EDIT_POST = 'EDIT_POST'
const DELETE_POST = 'DELETE_POST'
const GET_MAIN = 'GET_MAIN'
const GET_SEARCH = 'GET_SEARCH'
//라이크 부분
const IS_LIKE = 'IS_LIKE'
const UN_LIKE = 'UN_LIKE'
const GET_SUBS = 'GET_SUBS'

//액션 생성
const addPost = createAction(ADD_POST, (post) => ({ post }))
const getPost = createAction(GET_POST, (posts) => ({ posts }))
const getOnePost = createAction(GETONE_POST, (post) => ({ post }))
const editPost = createAction(EDIT_POST, (postNum, post) => ({
  postNum,
  post,
}))
const deletePost = createAction(DELETE_POST, (post) => ({ post }))
const getMain = createAction(GET_MAIN, (list) => ({ list }))
const getSearch = createAction(GET_SEARCH, (post) => ({ post }))
const isLike = createAction(IS_LIKE, (likeCheck, likeCount) => ({
  likeCheck,
  likeCount,
}))
const unLike = createAction(UN_LIKE, (un_like) => ({ un_like }))
const getSubs = createAction(GET_SUBS, (list) => ({ list }))

//초기값
const initialState = {
  list: [],
  detail: [],
  search: [],
}

//미들웨어
//생성
const addPostDB = (formData) => {
  return async function (dispatch, getState, { history }) {
    let _post = {
      ...initialState,
      formData,
    }
    await axios({
      method: 'post',
      url: `${BASE_URL}/api/posts`,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        console.log(res)

        dispatch(addPost(res.data))
        history.replace('/')
      })
      .catch((err) => {
        window.alert('공란을 채워주세요')
        console.log('게시물작성실패', err)
      })
  }
}

//조회
const getOnePostDB = (postNum) => {
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
        const post = res.data.post
        console.log(res.data)
        let post_data = {
          postCnt: post.postCnt,
          postCommentNum: post.postCommentNum,
          postDate: post.postDate,
          postNum: post.postNum,
          postDesc: post.postDesc,
          postTitle: post.postTitle,
          postVideo: post.postVideo,
          postLikeNum: post.postLikeNum,
          postUnlikeNum: post.postUnlikeNum,
          userNick: post.userInfo.userNick,
          userId: post.userInfo.userId,
          userProfile: post.userInfo.userProfile,
          userSubscribe: post.userInfo.userSubscribe,
          likeCheck: res.data.likeCheck,
          unlikeCheck: res.data.unlikeCheck,
          subscribeCheck: res.data.subscribeCheck,
        }
        console.log(post_data)

        dispatch(getOnePost(post_data))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

//대박대박 메인 일단 싹다 가져와~
const getMainDB = () => {
  return async function (dispatch, getState, { history }) {
    await axios.get(`${BASE_URL}/api/main`).then((res) => {
      const post = res.data
      console.log(post)
      dispatch(getMain(post))
    })
  }
}

//수정
const editPostDB = (postNum, formData) => {
  console.log(typeof postNum)
  return async function (dispatch, getState, { history }) {
    if (!postNum) {
      console.log('게시물 정보를 찾을 수 없어요.')
      return
    }
    const preview = getState().picture.preview
    console.log(preview)
    const post_idx = getState().post.list.posts.findIndex(
      (p) => p.postNum === Number(postNum),
    )
    console.log(getState().post.list)
    const _post = getState().post.list.posts[post_idx]
    let post = {
      ..._post,
      formData,
    }
    await axios({
      method: 'put',
      url: `${BASE_URL}/api/posts?postNum=${postNum}`,
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data`,
        Authorization: `Bearer${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        console.log(res)
        dispatch(editPost(postNum, res.data))
        console.log('수정되었습니다')
        history.push('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

//삭제
const deletePostDB = (postNum) => {
  console.log(postNum)

  return async function (dispatch, getState, { history }) {
    await axios({
      method: 'delete',
      url: `${BASE_URL}/api/posts?postNum=${postNum}`,
      headers: {
        Authorization: `Bearer${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        console.log(res)
        dispatch(deletePost(postNum))
        history.replace('/')
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

const isLikeDB = (postNum, likeCheck, unlikeCheck, likeNum) => {
  console.log(postNum, likeCheck, unlikeCheck)
  console.log(
    '현재 좋아요 상태!: ',
    likeCheck,
    '현재 싫어요 상태!: ',
    unlikeCheck,
  )
  return async function (dispatch, getState, { history }) {
    await axios({
      method: 'post',
      url: `${BASE_URL}/api/like?postNum=${postNum}`,
      data: { likeCheck: likeCheck, unlikeCheck: unlikeCheck },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer${localStorage.getItem('token')}`,
      },
    })
      // .post(
      //   `${BASE_URL}/api/like?postNum=${postNum}`,

      //     data:{ likeCheck: likeCheck,
      //     unlikeCheck: unlikeCheck,},

      //   {
      //     headers: {
      //       'Content-Type': `application/json`,
      //       Authorization: `Bearer${localStorage.getItem('token')}`,
      //     },
      //   },
      // )
      .then((res) => {
        const _like = res.data.result

        dispatch(isLike(likeCheck))
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
        console.log(res.data.result)
        dispatch(unLike(unlikeCheck))
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
        dispatch(getSubs(userSub, subCheck))
      })
      .catch((err) => {
        console.log('에ㅔ러', err)
      })
  }
}

const searchDB = (searchWord = null) => {
  return async function (dispatch, getState, { history }) {
    await axios({
      method: 'get',
      url: `${BASE_URL}/api/search?keyword=${searchWord}`,
      headers: {
        'Content-Type': `application/json`,
      },
    })
      .then((res) => {
        console.log(res.data)
        let list = [...res.data.posts]
        dispatch(getSearch(list))
      })
      .catch((err) => {
        console.log('err', err)
      })
  }
}

//리듀서
export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(state)
        console.log(action.payload)
        draft.list = action.payload.post
        // draft.list = [{ ...action.payload.post }, ...draft.list];
        console.log(draft.list, action.payload.post)
      }),
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.num === cur.num) === -1) {
            return [...acc, cur]
          } else {
            acc[acc.findIndex((a) => a.num === cur.num)] = cur
            return acc
          }
        }, [])
        draft.list = action.payload.posts
      }),
    [GETONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = action.payload.post
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload)
        console.log(state)
        let index = draft.list.posts.findIndex(
          (p) => p.postNum === action.payload.postNum,
        )
        console.log(index, '인덱스는?')
        draft.list[index] = { ...draft.list[index], ...action.payload.post }
      }),
    [GET_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list
      }),

    [GET_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        draft.search = [...action.payload.post]
      }),

    //       [GET_SEARCH]: (state, action) =>
    //       produce(state, (draft)) => {
    //         draft.list = action.payload.search_list
    // }),

    [IS_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const { likeCheck } = action.payload

        {
          likeCheck
            ? (draft.detail = {
                ...draft.detail,
                likeCheck: !likeCheck,
                postLikeNum: draft.detail.postLikeNum - 1,
              })
            : (draft.detail = {
                ...draft.detail,
                likeCheck: !likeCheck,
                postLikeNum: draft.detail.postLikeNum + 1,
              })
        }

        // const { isLike, likeNum } = action.payload
        // draft.isLike = isLike
      }),

    [UN_LIKE]: (state, action) =>
      produce(state, (draft) => {
        const { unlikeCheck } = action.payload

        {
          unlikeCheck
            ? (draft.detail = {
                ...draft.detail,
                unlikeCheck: !unlikeCheck,
                postUnlikeNum: draft.detail.postUnlikeNum - 1,
              })
            : (draft.detail = {
                ...draft.detail,
                unlikeCheck: !unlikeCheck,
                postUnlikeNum: draft.detail.postUnlikeNum + 1,
              })
        }
      }),
    [GET_SUBS]: (state, action) =>
      produce(state, (draft) => {
        const { subscribeCheck } = action.payload

        {
          !subscribeCheck
            ? (draft.detail = {
                ...draft.detail,
                subscribeCheck: !subscribeCheck,
                userSubscribe: draft.detail.userSubscribe - 1,
              })
            : (draft.detail = {
                ...draft.detail,
                subscribeCheck: !subscribeCheck,
                userSubscribe: draft.detail.userSubscribe + 1,
              })
        }
      }),
    [GET_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list
        console.log(draft.list)
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(state)
        console.log(action.payload)
        let list = draft.list.posts.filter(
          (p) => p.postNum !== action.payload.post,
        )
        draft.list = [...list]
      }),
  },
  initialState,
)

const actionCreators = {
  addPost,
  addPostDB,
  getPost,
  editPost,
  editPostDB,
  getOnePost,
  getOnePostDB,
  getMainDB,
  searchDB,
  isLikeDB,
  unlikeDB,
  getSubsDB,
  deletePost,
  deletePostDB,
}

export { actionCreators }
