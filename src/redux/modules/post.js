import axios from 'axios';
import produce from 'immer';

import { createAction, handleActions } from 'redux-actions';

//액션
const ADD_POST = 'ADD_POST';
const GET_POST = 'GET_POST';
const GETONE_POST = 'GETONE_POST';
const EDIT_POST = 'EDIT_POST';

//액션 생성
const addPost = createAction(ADD_POST, (post) => ({ post }));
const getPost = createAction(GET_POST, (posts) => ({ posts }));
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

//미들웨어
//생성
const addPostDB = (formData) => {
  return async function (dispatch, getState, { history }) {
    let _post = {
      formData,
    };
    await axios({
      method: 'post',
      url: 'https://95bdde78-b028-4db6-b139-9f7e8f06b2e5.mock.pstmn.io/post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        // Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        dispatch(addPost(_post));

        // history.push("/main");
      })
      .catch((err) => {
        console.log('게시물작성실패', err);
      });
  };
};

//조회
const getPostDB = () => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get('/api/posts?postNum=1')
      // .get('https://reqres.in/api/unknown')
      .then((res) => {
        let _posts = [];
        res.data.posts.forEach((posts) => {
          _posts.push({ num: posts.num, ...posts });
        });
        dispatch(getPost(_posts));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

//포스트 및 디테일
const getOnePostDB = (id) => {
  return async function (dispatch, getState, { history }) {
    await axios
      .get(`/api/posts?postNum=1`)
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
const editPostDB = (postNum, formData) => {
  return async function (dispatch, getState, { history }) {
    if (!postNum) {
      console.log('게시물 정보를 찾을 수 없어요.');
      return;
    }
    const _post_index = getState().post.list.findIndex(
      (p) => p.postNum === postNum
    );
    const _post = getState().post.list[_post_index];
    let post = {
      ..._post,
      formData,
    };

    await axios({
      method: 'post',
      url: '/api/posts?postNum=1',
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
