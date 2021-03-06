import React, { useEffect, useState } from 'react'
import logo from './img/Youtube-Logo.png'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../redux/configureStore'

import { actionCreator as userActions } from '../redux/modules/user'
import { Grid, Input, Text, Button, Image } from '../elements/index'
import Search from '../components/Search'

//icons
import { FaBars } from 'react-icons/fa'
import { RiLogoutBoxRLine, RiVideoAddFill } from 'react-icons/ri'
import { MdApps, MdOutlineNotificationsNone } from 'react-icons/md'

import { getToken } from './Token'
//분기 최소화 리팩토링 해야됨!!!!!
const Header = (props) => {
  const userInfo = useSelector((state) => state.user.user)
  const is_login = useSelector((state) => state.user.is_login)
  const dispatch = useDispatch()
  const is_token = localStorage.getItem('token') ? true : false

  const postWrite = () => {
    if(is_token){
     history.push('/postWrite')
    }else{
      alert('로그인 후 동영상을 올릴 수 있습니다!')
    }
  }

  if (window.location.pathname === '/login' || window.location.pathname === '/signup') {
    return null
  }

  if (is_token) {
    return (
      <HeaderContainer>
        <Grid className="header">
          <Grid isFlex>
            <Grid isFlex_start>
              <Grid isFlex margin="0 30px">
                <FaBars size="20" color="#fff" className="icons" />
              </Grid>
              <Logo
                src={logo}
                onClick={() => {
                  history.push('/')
                }}
              />
            </Grid>
            <Search />
            <Grid isFlex_end>
              <Grid isFlex margin="0 30px">
                <Grid isFlex marign="0 30px">
                  <RiVideoAddFill
                    size="24"
                    color="#fff"
                    className="rgIcons"
                    onClick={() => history.push('/postWrite')}
                  />
                </Grid>
                <MdApps className="rgIcons" size="24" color="#fff" />
                <MdOutlineNotificationsNone
                  className="rgIcons"
                  size="24"
                  color="#fff"
                />
                <RiLogoutBoxRLine
                  className="rgIcons"
                  size="24"
                  color="#fff"
                  onClick={() => {
                    dispatch(userActions.logOutDB({}))
                  }}
                />
                <Image
                  shape="profile"
                  src_01={userInfo?.userProfile}
                  margin="0 20px;"
                />
              </Grid>
              <Grid isFlex></Grid>
            </Grid>
          </Grid>
        </Grid>
      </HeaderContainer>
    )
  } else {
    return (
      <HeaderContainer>
        <Grid className="header">
          <Grid isFlex>
            <Grid isFlex_start>
              <Grid isFlex margin="0 30px">
                <FaBars size="20" color="#fff" className="icons" />
              </Grid>
              <Logo
                src={logo}
                onClick={() => {
                  history.push('/')
                }}
              />
            </Grid>

            <Search />

            <Grid isFlex_end>
              <Grid isFlex margin="0x">
                <Grid isFlex marign="0 30px">
                  <RiVideoAddFill
                  size="24"
                  color="#fff"
                  className="rgIcons"
                  onClick={postWrite}
                />
                </Grid>
                <MdApps className="rgIcons" size="24" color="#fff" />
                <MdOutlineNotificationsNone
                  className="rgIcons"
                  size="24"
                  color="#fff"
                />
              </Grid>
              <Grid isFlex>
                <Button
                  bg="#0583F2"
                  width="100px"
                  margin="0 20px"
                  _onClick={() => {
                   window.location.href='/login'
                  }}
                >
                  Signup
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </HeaderContainer>
    )
  }
}
const HeaderContainer = styled.div`
  background-color: #212121;
  padding: 1rem, 3rem;
  width: 100%;
  height: 8vh;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  /* width: 100% */
  left: 0;
  right: 0;
  z-index: 3;
`

const Logo = styled.img`
  width: 100px;
  display: block;
  cursor: pointer;
`

export default Header
