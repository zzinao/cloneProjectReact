import React, { useState } from 'react'
import { Grid, Input, Text, Button } from '../elements/index'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { history } from '../redux/configureStore'
import { actionCreator as userActions } from '../redux/modules/user'
import logo from '../shared/img/google_logo.png'

const Signup = () => {
  const dispatch = useDispatch()
  // 회원가입 state 관리
  const [signup, setSignup] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // 오류메세지
  const [pwWarning, setPwWarning] = useState(false)
  const [idMessage, setIdMessage] = useState('')
  const [nameMessage, setNameMessage] = useState('')
  const [pwMessage, setPwMessage] = useState('')
  const [pwConfirmMessage, setPwConfirmMessage] = useState('')

  // 유효성 검사
  const [isId, setIsId] = useState(false)
  const [isName, setIsName] = useState(false)
  const [isPw, setIsPw] = useState(false)
  const [isPwConfirm, setIsPwConfirm] = useState(false)

  const handleChange = (e) => {
    const id = e.target.id
    const value = e.target.value
    setSignup((values) => ({ ...values, [id]: value }))
  }

  const signUp = () => {
    if (!signup.id || !signup.pw || !signup.pwCheck || !signup.nick) {
      setSubmitted(true)
      return
    }
    dispatch(userActions.signupDB(signup))
    console.log(signup)
  }

  return (
    <>
      <Container>
        <SignUpForm>
          <Logo src={logo} />
          <Text weight="500" margin="10px 0 20px" size="35px">
            Welcome!
          </Text>
          <Grid>
            <Input
              fcBorder
              id="id"
              label="ID"
              value={signup.id}
              padding="10px"
              placeholder="Email or Phone"
              _onChange={handleChange}
            />
          </Grid>
          <Grid>
            <Input
              fcBorder
              id="nick"
              value={signup.nick}
              padding="10px"
              label="Nickname"
              placeholder="Nickname"
              _onChange={handleChange}
            />
            <Input
              fcBorder
              id="pw"
              value={signup.pw}
              padding="10px"
              label="Password"
              placeholder="Password"
              _onChange={handleChange}
            />
            <Input
              fcBorder
              id="pwCheck"
              value={signup.pwCheck}
              padding="10px"
              label="Password"
              placeholder="Password"
              _onChange={handleChange}
            />
          </Grid>
          <Button bg="#0583F2" margin="20px 0 0" _onClick={signUp}>
            Sign up
          </Button>
          <Grid isFlex_end margin="0 10px"></Grid>
        </SignUpForm>
        <Text
          color="#0583F2"
          _cursor
          onClick={() => {
            history.push('/login')
          }}
        >
          Back to the Login
        </Text>
      </Container>
    </>
  )
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 120px;
`

const SignUpForm = styled.div`
  display: flex;
  justify-conetent: center;
  flex-direction: column;
  text-align: center;
  max-width: 400px;
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

export default Signup
