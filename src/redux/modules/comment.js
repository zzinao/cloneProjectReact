import { createAction, handleActions } from 'redux-actions';
import { produce } from 'immer';
import axios from 'axios';
import { create } from 'lodash';

const BASE_URL = 'http://3.34.98.31';

const SET_COMMENT = 'SET_COMMENT';
const ADD_COMMENT = 'ADD_COMMENT';
const DELETE_COMMENT = 'DELETE_COMMENT';
const UPDATE_COMMENT = 'UPDATE_COMMENT';

const setComment = createAction(SET_COMMENT, (postNum, commentList) => ({
  postNum,
  commentList,
}));

const addComment = createAction(ADD_COMMENT, (postNum, comment) => ({
  postNum,
  comment,
}));

const deleteComment = createAction(DELETE_COMMENT, (commentNum, postNum) => ({
  commentNum,
  postNum,
}));

const updateComment = createAction(UPDATE_COMMENT, (commentNum, comment) => ({
  commentNum,
  comment,
}));

const initialState = {
  list: {
    post: {
      postNum: 1,
      postTitle: '글제목입니다',
      postDesc: '글 내용입니다',
      postThumb: '이미지 경로',
      postData: '2022.04.08.00.00',
      postLikeNum: 0,
      postCommentNum: 0,
      userId: '작성자아이디',
      postCnt: '조회수',
      userInfo: {
        userId: '아이디',
        userPw: '비밀번호',
        userNick: '닉네임',
        userProfile: 'https://pbs.twimg.com/media/EmDzIYWUcAA9TAL.jpg',
        userSubscribe: 100,
      },
    },
    comment: [
      {
        postNum: 1,
        commentNum: 1,
        userId: '아이디',
        contents: '댓글내용',
        commentDate: '2022.04.08.00:00',
        userInfo: {
          userId: '아이디',
          userPw: '비밀번호',
          userNick: '닉네임',
          userProfile: '프로필 사진 경로',
          userSubscribe: 100,
        },
      },
    ],
  },
};

//MIDDLE WARES
//코멘트 등록 500에러 확인
const addCommentDB = (contents, postNum) => {
  console.log(contents, postNum);
  console.log(localStorage.getItem('token'));
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
        }
      )

      // ({
      //   method: 'post',
      //   url: `${BASE_URL}/api/comments?postNum=${postNum}`,
      //   data: contents,
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer${localStorage.getItem('token')}`,
      //   },
      // })
      .then((res) => {
        console.log(res.data);
        dispatch(addComment());
      })
      .catch((err) => {
        console.log('게시물작성실패', err);
      });
  };
};

// const getCommentDB = (postNum) => {
//   return async function (dispatch, getState) {
//     try {
//       await axios({
//         method: 'get',
//         url: `/api/posts?postNum=:${postNum}`,
//         headers: {
//           // authorization: `Bearer ${token}`,
//         },
//       }).then((response) => {
//         console.log(response)
//         dispatch(setComment(response))
//       })
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }

//REDUCER

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.postNum] = action.payload.commenList;
      }),
    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        console.log(draft.list);
        console.log(action.payload);
        draft.list[action.payload.postNum].unshift(action.payload.comment);
      }),
    [DELETE_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = draft.list.filter(
          (d) => d.commentNum !== action.payload.commentNum
        );
      }),
  },
  initialState
);

export const commentActions = {
  addCommentDB,
};
