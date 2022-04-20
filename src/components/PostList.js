import React from 'react'
import Post from './Post'
import { Text } from '../elements/index'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { actionCreators as postActions } from '../redux/modules/post'

const PostList = (props) => {
  const list = useSelector((state) => state?.post?.list?.posts)
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(postActions.getMainDB())
  }, [])

  return (
    <React.Fragment>
      {list ? (
        list.map((post, i) => {
          return (
            <VideoList key={post._id}>
              <Post {...post} />
            </VideoList>
          )
        })
      ) : (
        <>
          <Text color="#fff" size="30px" weight="700">
            텅텅...비디오를 올려주세요
          </Text>
        </>
      )}
    </React.Fragment>
  )
}

const VideoList = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  margin: 0 0 0 210px;

  justify-content: ;
`

export default PostList
