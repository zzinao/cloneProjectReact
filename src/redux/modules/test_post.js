import { createAction, handleActions } from 'redux-actions';
import { immerable, produce } from 'immer';

import { apis } from '../../shared/Request';
import instance from '../../shared/Request';

// post
const SET_POST = 'SET_POST';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';
const ONE_POST = 'ONE_POST';
const STATE_POST = 'STATE_POST';

const SEARCH_POST = 'SEARCH_POST';
const SET_CATEGORY = 'SET_CATEGORY';

//좋아요
const EDIT_LIKE = 'EDIT_LIKE';
//구독
const EDIT_SUBSCRIBE = 'EDIT_SUBSCRIBE';
// Image
const IMAGE_URL = 'IMAGE_URL';

const setPost = createAction(SET_POST, (post_list, checkLoadAll) => ({
  post_list,
  checkLoadAll,
}));
const addPost = createAction(ADD_POST, (post) => ({ post }));
const editPost = createAction(EDIT_POST, (post_id, post) => ({
  post_id,
  post,
}));
const deletePost = createAction(DELETE_POST, (post_id) => ({ post_id }));
const getOnePost = createAction(ONE_POST, (post) => ({
  post,
}));
const statePost = createAction(STATE_POST, () => ({}));

// 이미지 url 저장
const getImageUrl = createAction(IMAGE_URL, (img_url) => ({ img_url }));

// post Search
const searchPost = createAction(SEARCH_POST, (word) => ({ word }));

//카테고리 설정
const setCategory = createAction(SET_CATEGORY, (category) => ({
  category,
}));

//좋아요
const editLike = createAction(EDIT_LIKE, (postId, isPush) => ({
  postId,
  isPush,
}));

//구독
//좋아요
const editSubscribe = createAction(
  EDIT_SUBSCRIBE,
  (channelName, postId, isPush) => ({
    channelName,
    postId,
    isPush,
  })
);

const initialPost = {
  postId: '_id',
  channelName: '홍길동',
  videoUrl: 'ur',
  imageUrl: 'url',
  title: '제목',
  createdAt: '2022-2-18 22',
  views: 0,
  category: '게임',
  content: '내용',
  likes: ['user_id', 'user_id'],
  comments: [],
};

const initialState = {
  list: [initialPost],
  post: [],
  comments: [],
  img: 'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlOeQ2%2Fbtrtys8M1UX%2FEXvjbkD77erg12mnimKaK0%2Fimg.png',
  filterState: 0, // 0 : 전체보기 1 : 판매 중 2: 판매 완료
  category: '전체',
  is_loaded: false,
};

//middleware

//전체 영상 조회

// 카테고리 별 상품 조회
const getPostCategory = (category) => {
  if (category) {
    return function (dispatch, useState, { history }) {
      instance
        .get(`/api/posts?category=${category}`)
        .then((response) => {
          dispatch(setPost(response.data.posts, false));
          dispatch(setCategory(category));
        })
        .catch((error) => {});
    };
  }
};
//게시물 상세 페이지 가기
const getOnePostDB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .get(`/api/posts/${postId}`)
      .then((response) => {
        dispatch(getOnePost(response.data.post));
      })
      .catch((error) => {});
  };
};
//전체 상품 조회

const getPostAPI = () => {
  return async function (dispatch, useState, { history }) {
    await apis.posts().then(function (res) {
      dispatch(setPost(res.data.posts));
    });
  };
};
//영상 등록
const addPostAPI = (data) => {
  return function (dispatch, useState, { history }) {
    apis.add(data).then(function (res) {
      history.replace('/');
      // window.location.replace('/');
    });
  };
};
//영상 검색
const searchAPI = (keywordSearch) => {
  return function (dispatch, useState, { history }) {
    history.push(`/search?word=${keywordSearch}`);

    apis.wordSearch(keywordSearch).then(function (res) {
      dispatch(searchPost(res.data.posts));
    });
  };
};

//게시물 삭제
const clappingDeleteAPI = (postId) => {
  return function (dispatch, useState, { history }) {
    apis.delete(postId).then(function (res) {
      history.replace('/');
    });
  };
};

//좋아요
const addLikeDB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/api/posts/${postId}/like/`)
      .then((response) => {
        dispatch(editLike(postId, true));
      })
      .catch((error) => {
        console.error(error);
      })
      .then((response) => {
        dispatch(getOnePostDB(postId));
      });
  };
};

//좋아요취소
const deleteLikeDB = (postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/api/posts/${postId}/like/`)
      .then((response) => {
        dispatch(editLike(postId, false));
      })
      .catch((error) => {
        console.error(error);
      })
      .then((response) => {
        dispatch(getOnePostDB(postId));
      });
  };
};

//구독
const addSubscribeDB = (channelName, postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .post(`/api/posts/${channelName}/subscribe/`)
      .then((response) => {
        dispatch(editSubscribe(channelName, true));
      })
      .catch((error) => {
        console.error(error);
      })
      .then((response) => {
        dispatch(getOnePostDB(postId));
      });
  };
};

//구독취소
const deleteSubscribeDB = (channelName, postId) => {
  return function (dispatch, getState, { history }) {
    instance
      .delete(`/api/posts/${channelName}/subscribe/`)
      .then((response) => {
        dispatch(editSubscribe(channelName, false));
      })
      .catch((error) => {
        console.error(error);
      })
      .then((response) => {
        dispatch(getOnePostDB(postId));
      });
  };
};

export default handleActions(
  {
    [SET_CATEGORY]: (state, action) =>
      produce(state, (draft) => {
        draft.category = action.payload.category;
        draft.is_loaded = true;
      }),

    [SET_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.post_list;
        draft.is_loaded = true;
      }),
    [ONE_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.post = action.payload.post;
        draft.is_loaded = true;
        // draft.post.comments = action.payload.comments;
      }),
    [ADD_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
        draft.is_loaded = true;
      }),
    [SEARCH_POST]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.word;
        draft.is_loaded = true;
      }),

    [EDIT_LIKE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (e) => e.postId === action.payload.postId
        );
        draft.is_loaded = true;
        // if (action.payload.isPush) {
        //   draft.list[idx].curMembers.push(action.payload.post.userName);
        //   draft.is_loaded = true;
        // } else {
        //   draft.list[idx].curMembers = draft.list[idx].curMembers.filter(
        //     (e) => e !== action.payload.post.userName
        //   );
        //   draft.is_loaded = true;
        // }
      }),
    [EDIT_SUBSCRIBE]: (state, action) =>
      produce(state, (draft) => {
        let idx = draft.list.findIndex(
          (e) => e.postId === action.payload.postId
        );
        draft.is_loaded = true;
        // if (action.payload.isPush) {
        //   draft.list[idx].curMembers.push(action.payload.post.userName);
        //   draft.is_loaded = true;
        // } else {
        //   draft.list[idx].curMembers = draft.list[idx].curMembers.filter(
        //     (e) => e !== action.payload.post.userName
        //   );
        //   draft.is_loaded = true;
        // }
      }),
  },
  initialState
);

const actionCreators = {
  getPostAPI,
  addPostAPI,
  clappingDeleteAPI,
  searchAPI,
  getPostCategory,
  getOnePostDB,
  editLike,
  addLikeDB,
  deleteLikeDB,
  editSubscribe,
  addSubscribeDB,
  deleteSubscribeDB,
};

export { actionCreators };
