import axios from 'axios';
import produce from 'immer';

import { createAction, handleActions } from 'redux-actions';

const BASE_URL = 'http://3.34.98.31';

//액션
const ADD_POST = 'ADD_POST';
const GET_POST = 'GET_POST';
const GETONE_POST = 'GETONE_POST';
const EDIT_POST = 'EDIT_POST';
const GET_MAIN = 'GET_MAIN';
const DELETE_POST = 'DELETE_POST';

//액션 생성
const addPost = createAction(ADD_POST, (post) => ({ post }));
const getPost = createAction(GET_POST, (posts) => ({ posts }));
const getOnePost = createAction(GETONE_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (postNum, post) => ({
  postNum,
  post,
}));
const getMain = createAction(GET_MAIN, (list) => ({ list }));
const deletePost = createAction(DELETE_POST, (post) => ({ post }));

//초기값
const initialState = {
  post: {
    postNum: 1,
    postTitle: '글 제목입니다.',
    postDesc: '글 내용입니다.',
    postThumb: '이미지 경로',
    postDate: '2022.04.08.00:00',
    postLikeNum: 0,
    postUnikeNum: 0,
    postCommentNum: 0,
    userId: '작성자 아이디',
    postCnt: '조회수',
    postVideo: '동영상 경로',
    userInfo: {
      userId: '아이디',
      userPw: '비밀번호',
      userNick: '닉네임',
      userProfile: '프로필 사진 경로',
      userSubscribe: 100,
    },
  },

  list: [],
  detail: [],
};

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
    };
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
        console.log('token');
        console.log(res);
        dispatch(addPost(_post));

        history.replace('/');
      })
      .catch((err) => {
        console.log('게시물작성실패', err);
      });
  };
};

//조회
const getOnePostDB = (postNum) => {
  console.log(postNum);
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
        console.log(res.data);
        dispatch(getOnePost(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//대박대박 메인 일단 싹다 가져와~
const getMainDB = () => {
  return async function (dispatch, getState, { history }) {
    await axios.get(`${BASE_URL}/api/main`).then((res) => {
      console.log(res.data);
      const post = res.data;
      dispatch(getMain(post));
    });
  };
};

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
const editPostDB = (postNum, formData) => {
  return async function (dispatch, getState, { history }) {
    if (!postNum) {
      console.log('게시물 정보를 찾을 수 없어요.');
      return;
    }
    const preview = getState().picture.preview;
    console.log(preview);
    const post_idx = getState().post.list.findIndex(
      (p) => p.postNum === postNum
    );
    const post = getState().post.list[post_idx];
    let _post = {
      ...post,
      formData,
    };

    await axios({
      method: 'put',
      url: `${BASE_URL}/api/posts?postNum=${postNum}`,
      data: formData,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        Authorization: `Bearer${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        dispatch(editPost(post));
        console.log('수정되었습니다');
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//삭제
const deletePostDB = (postNum) => {
  console.log(postNum);

  return async function (dispatch, getState, { history }) {
    await axios({
      method: 'delete',
      url: `${BASE_URL}/api/posts?postNum=5`,
      headers: {
        Authorization: `Bearer${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        console.lor(res);
        dispatch(deletePost(5));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//검색
const searchDB = (searchWord = null) => {
  console.log(searchWord);
  return async function (dispatch, getState, { history }) {
    // await axios
    // ({
    //   method: 'get',
    //   url: `${BASE_URL}/api/search?keyword=${searchWord}`,
    //   headers: {
    //     'Content-Type': `application/json`,
    //   },
    // })

    await axios
      .get(
        `${BASE_URL}/api/search`,
        { params: { keyword: searchWord } }
        // {
        //   headers: { 'Content-Type': `application/json` }, }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log('err', err);
      });
  };
};

//리듀서
export default handleActions(
  {
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
      }),
    [GET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.reduce((acc, cur) => {
          if (acc.findIndex((a) => a.num === cur.num) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a.num === cur.num)] = cur;
            return acc;
          }
        }, []);
        draft.list = action.payload.posts;
      }),
    [GETONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = action.payload.post;
        console.log(draft.detail);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.list.findIndex(
          (p) => p.num === action.payload.postNum
        );
        console.log(index, '인덱스는?');
        draft.list[index] = { ...draft.list[index], ...action.payload.post };
      }),
    [GET_MAIN]: (state, action) =>
      produce(state, (draft) => {
        console.log(draft);
        console.log(action.payload);
        draft.list = action.payload.list;
        console.log(draft.list);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter((p) => p.num !== action.payload.post);
      }),
  },
  initialState
);

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
  deletePost,
  deletePostDB,
};

export { actionCreators };
