import React from 'react'
import styled from 'styled-components'
import { Text, Image, Grid } from '../elements/index'
import SubsList from './SubsList'
import { Link } from 'react-router-dom'

//icons
import { RiHome5Fill, RiSaveLine } from 'react-icons/ri'
import { MdOutlineSubscriptions, MdOutlineSmartDisplay } from 'react-icons/md'
import { AiOutlineLike } from 'react-icons/ai'

const Sidebar = (pros) => {
  const comming = () => {
    alert('comming soon..!')
  }

const is_token = localStorage.getItem('token') ? true : false

  return (
    <>
      <Container>
        <Btn>
          <RiHome5Fill size="20" color="#fff" className="nav_icons" />
          <Text color="#fff" size="14px">
            홈
          </Text>
        </Btn>

        <Btn onClick={comming}>
          <MdOutlineSubscriptions
            size="20"
            color="#fff"
            className="nav_icons"
          />
          <Text color="#fff" size="14px">
            구독
          </Text>
        </Btn>
        <Hr />
        <Btn onClick={comming}>
          <AiOutlineLike size="20" color="#fff" className="nav_icons" />
          <Text color="#fff" size="14px">
            좋이요 표시한 동영상
          </Text>
        </Btn>
        <Btn onClick={comming}>
          <RiSaveLine size="20" color="#fff" className="nav_icons" />
          <Text color="#fff" size="14px">
            보관함
          </Text>
        </Btn>
        <Btn onClick={comming}>
          <MdOutlineSmartDisplay size="20" color="#fff" className="nav_icons" />
          <Text color="#fff" size="14px">
            내 동영상
          </Text>
        </Btn>
        <Hr />
        <Text margin="20px 30px" color="#fff" size="14px">
          구독
        </Text>
        {is_token ?  <SubsList /> : null}
      </Container>
    </>
  )
}

const Container = styled.div`
  background-color: #212121;
  width: 220px;
  height: 100vh;
  margin-top: 8vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
