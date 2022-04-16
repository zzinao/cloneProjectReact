import React from 'react'
import styled from 'styled-components'
import { Text, Image, Grid } from '../elements/index'

const SubList = (props) => {
  return (
    <>
      <List isFlex_start>
        <Image
          shape="profile"
          src={props.userSub.userProfile}
          margin="0 20px 0 0"
        />
        <Text size="14px" color="#fff">
          {props.userSub.userNick}
        </Text>
      </List>
    </>
  )
}
SubList.defaultProps = {
  userSub: {
    userNick: 'mark',
    userProfile: 'https://pbs.twimg.com/media/Em9MilNUYAQRbLS.jpg',
  },
}

const List = styled.div`
  padding: 0 30px;
  display: flex;
  flex-direction: start;
  align-items: center;
  &: hover {
    background-color: #3d3d3d;
  }
`

export default SubList
