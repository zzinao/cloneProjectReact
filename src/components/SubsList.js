import React from 'react'
import styled from 'styled-components'
import { Text, Image, Grid } from '../elements/index'

const SubList = (props) => {
  return (
    <div>
      <List isFlex_start>
        <Profile></Profile>
        <Text size="14px" color="#fff">
          구독자 이름
        </Text>
      </List>
      <List isFlex_start>
        <Profile></Profile>
        <Text size="14px" color="#fff">
          구독자 이름
        </Text>
      </List>
      <List isFlex_start>
        <Profile></Profile>
        <Text size="14px" color="#fff">
          구독자 이름
        </Text>
      </List>
      <List isFlex_start>
        <Profile></Profile>
        <Text size="14px" color="#fff">
          구독자 이름
        </Text>
      </List>
    </div>
  )
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
const Profile = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 20px 0 0;
  background-color: #aaa;
  border-radius: 70%;
`

export default SubList
