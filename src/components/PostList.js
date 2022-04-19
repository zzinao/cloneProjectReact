import React from 'react'
import Post from './Post'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as postActions } from '../redux/modules/post'

const PostList = (props) => {
  const list = useSelector((state) => state?.post?.list?.posts)
  console.log(list)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(postActions.getMainDB())
  }, [])

  return (
    <React.Fragment>
      {list ? (
        list.map((post, i) => {
          return (
            <VideoList>
              <Post {...post} />
            </VideoList>
          )
        })
      ) : (
        <div>아무것도 없음</div>
      )}
    </React.Fragment>
  )
}

const VideoList = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`

export default PostList
