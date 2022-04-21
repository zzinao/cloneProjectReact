import axios from 'axios';
import produce from 'immer';

import { createAction, handleActions } from 'redux-actions';

const BASE_URL = 'http://3.34.98.31';

//액션
const ADD_POST = 'ADD_POST';
const GETONE_POST = 'GETONE_POST';
const EDIT_POST = 'EDIT_POST';
const GET_MAIN = 'GET_MAIN';
const DELETE_POST = 'DELETE_POST';

//액션 생성
const addPost = createAction(ADD_POST, (post) => ({ post }));
const getOnePost = createAction(GETONE_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (postNum, post) => ({
  postNum, // 미들웨어의 postNum 파라미터
  post, //내용
}));
const getMain = createAction(GET_MAIN, (list) => ({ list }));
const deletePost = createAction(DELETE_POST, (post) => ({ post }));

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
      ...initialState,
      formData,
    };
    console.log(_post);
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
        console.log(res);

        dispatch(addPost(res.data));
        history.replace('/');
      })
      .catch((err) => {
        window.alert('공란을 채워주세요');
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
        console.log(res);
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
      const post = res.data;
      console.log(post);
      dispatch(getMain(post));
    });
  };
};

//수정
const editPostDB = (postNum, formData) => {
  console.log(typeof postNum);
  return async function (dispatch, getState, { history }) {
    if (!postNum) {
      console.log('게시물 정보를 찾을 수 없어요.');
      return;
    }
    const preview = getState().picture.preview;
    console.log(preview);
    const post_idx = getState().post.list.posts.findIndex(
      (p) => p.postNum === Number(postNum)
    );
    console.log(getState().post.list);
    const _post = getState().post.list.posts[post_idx];
    let post = {
      ..._post,
      formData,
    };
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
        console.log(res);
        dispatch(editPost(postNum, res.data));
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
      url: `${BASE_URL}/api/posts?postNum=${postNum}`,
      headers: {
        Authorization: `Bearer${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        console.log(res);
        dispatch(deletePost(postNum));
        history.replace('/');
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
        console.log(state);
        console.log(action.payload);
        draft.list = action.payload.post;
        // draft.list = [{ ...action.payload.post }, ...draft.list];
        console.log(draft.list, action.payload.post);
      }),
    [GETONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.detail = action.payload.post;
        console.log(draft.detail);
      }),
    [EDIT_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        console.log(state);
        let index = draft.list.posts.findIndex(
          (p) => p.postNum === action.payload.postNum
        );
        console.log(index, '인덱스는?');
        draft.list[index] = { ...draft.list[index], ...action.payload.post };
      }),
    [GET_MAIN]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.list;
        console.log(draft.list);
      }),
    [DELETE_POST]: (state, action) =>
      produce(state, (draft) => {
        console.log(state);
        console.log(action.payload);
        let list = draft.list.posts.filter(
          (p) => p.postNum !== action.payload.post
        );
        draft.list = [...list];
      }),
  },
  initialState
);

const actionCreators = {
  addPost,
  addPostDB,
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
