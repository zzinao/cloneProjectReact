import React from 'react'
import logo from './img/Youtube-Logo.png'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../redux/configureStore'
import { actionCreator as userActions } from '../redux/modules/user'
import { Grid, Input, Text, Button, Image } from '../elements/index'

//icons
import { FaBars } from 'react-icons/fa'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import {
  MdApps,
  MdOutlineNotificationsNone,
  MdVideocam,
  MdSearch,
} from 'react-icons/md'

import { getToken } from './Token'

const Header = (props) => {
  const dispatch = useDispatch()
  const token = getToken ? true : false
  const is_login = useSelector((state) => state.user.is_login)

  if (token && is_login) {
    return (
      <HeaderContainer>
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

          <Form>
            <InputField type="text" placeholder="검색" />
            <SearchBtn>
              <MdSearch size="26" color="#fff" className="icons" />
            </SearchBtn>
          </Form>

          <Grid isFlex_end>
            <Grid isFlex margin="0 30px">
              <Grid isFlex marign="0 30px">
                <MdVideocam size="24" color="#fff" className="rgIcons" />
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
              <Image />
            </Grid>
            <Grid isFlex></Grid>
          </Grid>
        </Grid>
      </HeaderContainer>
    )
  }
  return (
    <HeaderContainer>
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

        <Form>
          <InputField type="text" placeholder="검색" />
          <SearchBtn>
            <MdSearch size="26" color="#fff" className="icons" />
          </SearchBtn>
        </Form>

        <Grid isFlex_end>
          <Grid isFlex margin="0 30px">
            <Grid isFlex marign="0 30px">
              <MdVideocam size="24" color="#fff" className="rgIcons" />
            </Grid>
            <MdApps className="rgIcons" size="24" color="#fff" />
            <MdOutlineNotificationsNone
              className="rgIcons"
              size="24"
              color="#fff"
            />
            <Image />
          </Grid>
          <Grid isFlex>
            <Button
              bg="#0583F2"
              width="100px"
              margin="0 20px"
              onClick={() => {
                history.push('/login')
              }}
            >
              Signup
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </HeaderContainer>
  )
}
const HeaderContainer = styled.div`
  background-color: #212121;
  padding: 1rem, 3rem;
  width: 100%;
  height: 8vh;
  justify-content: center;
  align-items: center;
`

const Logo = styled.img`
  width: 100px;
  display: block;
  cursor: pointer;
`
const Form = styled.form`
  flex: 0.6;
  display: flex;
  padding: 0.1rem;
  margin: 3em;
  border-radius: 2px;
  border: 0.5px solid #aaa;
  :focus ;
`

const InputField = styled.input`
  width: 100%;
  border: none;
  font-weight: 500;
  background: #181818;
  padding: 0.5rem;
  color: #fff;
  paddng: 20px;

  &:focus {
    outline: none !important;
    // border: 1px solid #037bff;
  }
`
const SearchBtn = styled.button`
padding: 0 1.25rem
color: $text-color;
background: transparent;
border: none;
&:focus {
    border: none;
}

`

export default Header
