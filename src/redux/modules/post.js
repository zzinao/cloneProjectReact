import axios from 'axios'
import produce from 'immer'

import { createAction, handleActions } from 'redux-actions'

const BASE_URL = 'http://3.34.98.31'

//액션
const ADD_POST = 'ADD_POST'
const GET_POST = 'GET_POST'
const GETONE_POST = 'GETONE_POST'
const EDIT_POST = 'EDIT_POST'
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

// const initialPost = {
//   image: '',
//   content: '',
// };

//미들웨어
//생성
const addPostDB = (formData) => {
  return async function (dispatch, getState, { history }) {
    let _post = {
      // ...initialPost,
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
        console.log('token')
        console.log(res)
        dispatch(addPost(_post))

        // history.push("/main");
      })
      .catch((err) => {
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
      console.log(res.data)
      const post = res.data
      dispatch(getMain(post))
    })
  }
}

//포스트 및 디테일
// const getOnePostDB = (num) => {
//   return async function (dispatch, getState, { history }) {
//     await axios
//       .get(`http://15.164.211.148/api/posts?postNum=${num}`)
//       .then((res) => {
//         let post = res.data.detail
//         dispatch(getOnePost(post))
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   }
// }

//수정
const editPostDB = (num, formData) => {
  return async function (dispatch, getState, { history }) {
    if (!num) {
      console.log('게시물 정보를 찾을 수 없어요.')
      return
    }
    const _post_index = getState().post.list.findIndex((p) => p.num === num)
    const _post = getState().post.list[_post_index]
    let post = {
      ..._post,
      formData,
    }

    await axios({
      method: 'put',
      url: `http://15.164.211.148/api/posts?postNum=${num}`,
      // url: 'https://reqres.in/api/users/2',
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        dispatch(editPost(post))
        history.push('/main')
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

// const searchDB = (searchWord = null) => {
//   console.log(searchWord)
//   return async function (dispatch, getState, { history }) {
//     await axios({
//       method: 'get',
//       url: `${BASE_URL}/api/search?keyword=${searchWord}`,
//       headers: {
//         'Content-Type': `application/json`,
//       },
//     }).then((res) => {
//       let search = [...res.data.posts]
//       let search_list = []

//       search.forEach((post) =>
//         search_list.push({
//           postCnt: post.postCnt,
//           postDate: post.postDate,
//           postThumb: post.postThumb,
//           postTile: post.postTitle,
//           postVideo: post.postVideo,
//           userNick: post.userInfo.userNick,
//           userProfile: post.userProfile,
//         }),
//       )
//       dispatch(getSearch(search_list))
//     })
//   }
// }

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
        dispatch(getSubs())
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
        dispatch(getSearch(res.data))
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
        draft.list.unshift(action.payload.post)
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
        let index = draft.list.findIndex(
          (p) => p.num === action.payload.postNum,
        )
        console.log(index, '인덱스는?')
        draft.list[index] = { ...draft.list[index], ...action.payload.post }
      }),
    [GET_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list
        console.log(draft.list)
      }),

    [GET_SEARCH]: (state, action) =>
      produce(state, (draft) => {
        console.log(draft.search)
        draft.search = action.payload.search
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
                likeCheck: likeCheck,
                postLikeNum: draft.detail.postLikeNum - 1,
              })
            : (draft.detail = {
                ...draft.detail,
                likeCheck: likeCheck,
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
          !unlikeCheck
            ? (draft.detail = {
                ...draft.detail,
                unlikeCheck: unlikeCheck,
                postUnlikeNum: draft.detail.postUnlikeNum - 1,
              })
            : (draft.detail = {
                ...draft.detail,
                unlikeCheck: unlikeCheck,
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
                subscribeCheck: subscribeCheck,
                userSubscribe: draft.detail.userSubscribe - 1,
              })
            : (draft.detail = {
                ...draft.detail,
                subscribeCheck: subscribeCheck,
                userSubscribe: draft.detail.userSubscribe + 1,
              })
        }
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
}

export { actionCreators }
