import axios from 'axios';
import produce from 'immer';
import { setToken } from '../../shared/Token';

import { createAction, handleActions } from 'redux-actions';

//액션
const ADD_POST = 'ADD_POST';
const GET_POST = 'GET_POST';
const GETONE_POST = 'GETONE_POST';
const EDIT_POST = 'EDIT_POST';

//액션 생성
const addPost = createAction(ADD_POST, (post) => ({ post }));
const getPost = createAction(GET_POST, (post) => ({ post }));
const getOnePost = createAction(GETONE_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (postNum, post) => ({
  postNum,
  post,
}));

//초기값
const initialState = {
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
      url: 'http://15.164.211.148/api/posts',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        console.log('token');
        dispatch(addPost(_post));

        // history.push("/main");
      })
      .catch((err) => {
        console.log('게시물작성실패', err);
      });
  };
};

//조회
const getPostDB = (postNum) => {
  console.log(postNum);
  return async function (dispatch, getState, { history }) {
    await axios
      // 보류
      .get(`http://15.164.211.148/api/posts?postNum=5`, {
        headers: {
          Authorization: `Bearer${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        let post = res.data;
        dispatch(getPost(post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//포스트 및 디테일
const getOnePostDB = (num) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`http://15.164.211.148/api/posts?postNum=${num}`)
      .then((res) => {
        let post = res.data.detail;
        dispatch(getOnePost(post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//수정
const editPostDB = (num, formData) => {
  return async function (dispatch, getState, { history }) {
    if (!num) {
      console.log('게시물 정보를 찾을 수 없어요.');
      return;
    }
    const _post_index = getState().post.list.findIndex((p) => p.num === num);
    const _post = getState().post.list[_post_index];
    let post = {
      ..._post,
      formData,
    };

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
        dispatch(editPost(post));
        history.push('/main');
      })
      .catch((err) => {
        console.log(err);
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
        draft.list = action.payload.post;
      }),
    [GETONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = action.payload.post;
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        let index = draft.list.findIndex(
          (p) => p.num === action.payload.postNum
        );
        console.log(index, '인덱스는?');
        draft.list[index] = { ...draft.list[index], ...action.payload.post };
      }),
  },
  initialState
);

const actionCreators = {
  addPost,
  addPostDB,
  getPost,
  getPostDB,
  editPost,
  editPostDB,
  getOnePost,
  getOnePostDB,
};

export { actionCreators };
