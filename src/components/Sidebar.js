import React from 'react'
import styled from 'styled-components'
import { Text, Image, Grid } from '../elements/index'
import SubsList from './SubsList'
import { RiHome5Fill, RiSaveLine } from 'react-icons/ri'
import { MdOutlineSubscriptions, MdOutlineSmartDisplay } from 'react-icons/md'
import { AiOutlineLike } from 'react-icons/ai'
const Sidebar = (pros) => {
  return (
    <>
      <Container>
        <Btn>
          <RiHome5Fill size="20" color="#fff" className="nav_icons" />
          <Text color="#fff">홈</Text>
        </Btn>

        <Btn>
          <MdOutlineSubscriptions
            size="20"
            color="#fff"
            className="nav_icons"
          />
          <Text color="#fff">구독</Text>
        </Btn>
        <Hr />
        <Btn>
          <AiOutlineLike size="20" color="#fff" className="nav_icons" />
          <Text color="#fff">좋이요 표시한 동영상</Text>
        </Btn>
        <Btn>
          <RiSaveLine size="20" color="#fff" className="nav_icons" />
          <Text color="#fff">보관함</Text>
        </Btn>
        <Btn>
          <MdOutlineSmartDisplay size="20" color="#fff" className="nav_icons" />
          <Text color="#fff">내 동영상</Text>
        </Btn>
        <Hr />
        <Text margin="20px 30px" color="#fff">
          구독
        </Text>
        <SubsList />
      </Container>
    </>
  )
}

const Container = styled.div`
  background-color: #212121;
  width: 300px;
  height: 100vh;
`
const Btn = styled.div`
  padding: 0 30px;
  display: flex;
  flex-direction: start;
  align-items: center;
  &: hover {
    background-color: #3d3d3d;
  }
`

const Hr = styled.hr`
  border: none;
  height: 0.3px;
  color: #3d3d3d;
  background-color: #3d3d3d;
  margin: 10px;
`

export default Sidebar
