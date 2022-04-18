import React, { useState } from 'react'
import { Grid, Input, Text, Button } from '../elements/index'
import styled, { createGlobalStyle } from 'styled-components'
import { history } from '../redux/configureStore'
import { actionCreator as userActions } from '../redux/modules/user'
import { useDispatch } from 'react-redux'
import logo from '../shared/img/google_logo.png'

const Login = (props) => {
  const dispatch = useDispatch()
  //로그인 state 관리
  const [logins, setLogins] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value
    setLogins((values) => ({ ...values, [id]: value }))
  }

  const login = () => {
    if (!logins.id || !logins.pw) {
      setSubmitted(true)
      return
    }
    console.log(logins)
    dispatch(userActions.loginDB(logins))
  }
  return (
    <>
      <Container>
        <LoginForm>
          <Logo src={logo} />
          <Text weight="500" margin="10px 0 20px" size="35px">
            Sign in With Google
          </Text>
          <Grid margin="10px">
            <Input
              fcBorder
              id="id"
              label="ID"
              value={logins.id}
              padding="10px"
              placeholder="Email or Phone"
              _onChange={handleChange}
            />
          </Grid>
          <Grid margin="10px">
            <Input
              fcBorder
              id="pw"
              value={logins.pw}
              padding="10px"
              type="password"
              label="Password"
              placeholder="Password"
              _onChange={handleChange}
            />
          </Grid>
          <Button bg="#0583F2" margin="20px 0 0" _onClick={login}>
            Sign in
          </Button>
          <Grid isFlex_end margin="0 10px">
            <Text
              color="#0583F2"
              size="13px"
              _cursor
              onClick={() =>
                window.open(
                  'https://support.google.com/accounts/?hl=ko#topic=3382296',
                  '_blank',
                )
              }
            >
              Need help?
            </Text>
          </Grid>
        </LoginForm>
        <Text
          color="#0583F2"
          _cursor
          onClick={() => {
            history.push('/signup')
          }}
        >
          Create an account
        </Text>
      </Container>
      <GlobalStyle />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
body {
  background-color: #eee;
}
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

const LoginForm = styled.div`
  display: flex;
  justify-conetent: center;
  flex-direction: column;
  text-align: center;
  max-width: 500px;
  border: 1px solid #eee;
  background-color: #f8fafb;
  border-radius: 15px;
  padding: 50px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`

const Logo = styled.img`
  width: 100px;
`
//test
export default Login
