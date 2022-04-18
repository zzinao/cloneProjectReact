import React from 'react'
import { Grid, Text, Image } from '../elements/index'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
//코멘트 더미
const Comment = (props) => {
  const comment = useSelector((state) => state.comment?.list?.comment)

  console.log(comment)
  return (
    <>
      <CommentBox>
        <Image src={props.src} shape="profile" />
        <Grid>
          <Text>{props.userNick}</Text>
        </Grid>
        <Grid>
          <Text>{props.contents}</Text>
        </Grid>
        <Text>{props.commentDate}</Text>
      </CommentBox>
    </>
  )
}

const CommentBox = styled.div``

export default Comment
