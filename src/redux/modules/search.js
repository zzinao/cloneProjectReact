// //왜 안되는지 몰라서 일단 따로 뺌

// import axios from 'axios'
// import produce from 'immer'
// import moment from 'moment'

// import { createAction, handleActions } from 'redux-actions'

// const BASE_URL = 'http://3.34.98.31'

// const GET_SEARCH = 'GET_SEARCH'

// const getSearch = createAction(GET_SEARCH, (post) =>({post}))

// //요걸로 메인 db 미들웨어 다시 짜기

// const initialState = {
//     post: {
//       postNum: 1,
//       postTitle: '글 제목입니다.',
//       postThumb: '이미지 경로',
//       postDate: '2022.04.08.00:00',
//       postCnt: '조회수',
//       postVideo: '동영상 경로',
//       userInfo: {
//         userId: '아이디',
//         userNick: '닉네임',
//         userProfile: '프로필 사진 경로',
//       },
//     },

//   const searchDB = (searchWord = null) => {
//     return async function (dispatch, getState, { history }) {
//       await axios({
//         method: 'get',
//         url: `${BASE_URL}/api/search?keyword=${searchWord}`,
//         headers: {
//           'Content-Type': `application/json`,
//         },
//       })
//         .then((res) => {
//           console.log(res)
//         let search = [...res.data.posts]
//         let search_list = []

//        dispatch(search(search_list))
//         })
//      .catch((err) => {
//           console.log('err', err)
//   }

//   export default handleActions(
//     {

//     },
//     initialState,
//   )

//   const actionCreators = {

//     searchDB,
//   }

//   export { actionCreators }
