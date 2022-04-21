import React, { useState } from 'react'
import { Grid, Input, Text, Button } from '../elements/index'
import styled, { createGlobalStyle } from 'styled-components'
import { useDispatch } from 'react-redux'
import { history } from '../redux/configureStore'
import { actionCreator as userActions } from '../redux/modules/user'
import logo from '../shared/img/google_logo.png'

const Signup = (props) => {
  const dispatch = useDispatch()
  // 회원가입 state 관리
  //기본 회원가입 폼 값
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')
  const [pwCheck, setPwCheck] = useState('')
  const [nick, setNick] = useState('')

  // const [signup, setSignup] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // 오류메세지
  const [pwWarning, setPwWarning] = useState(false)
  const [idMessage, setIdMessage] = useState('')
  const [nickMessage, setNickMessage] = useState('')
  const [pwMessage, setPwMessage] = useState('')
  const [pwConfirmMessage, setPwConfirmMessage] = useState('')

  // 유효성 검사
  const [isId, setIsId] = useState(false)
  const [isNick, setIsNick] = useState(false)
  const [isPw, setIsPw] = useState(false)
  const [isPwConfirm, setIsPwConfirm] = useState(false)

  // const handleChange = (e) => {
  //   const id = e.target.id
  //   const value = e.target.value
  //   setSignup((values) => ({ ...values, [id]: value }))
  // }

  //아이디 체크
  const onChangeId = (e) => {
    setId(e.target.value)
    if (e.target.value.length < 4 || e.target.value.length > 10) {
      setIdMessage('4자리 이상 10자리 미만으로 입력해주세요.')
      setIsId(false)
    } else {
      setIdMessage('올바른 아이디 형식입니다')
      setIsId(true)
    }
  }
  //닉네임 체크
  const onChangeNick = (e) => {
    setNick(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 8) {
      setNickMessage('2글자 이상 8글자 미만으로 입력해주세요.')
      setIsNick(false)
    } else {
      setNickMessage('멋진 닉네임이네요!')
      setIsNick(true)
    }
  }

  //패스워드 체크
  const onChangePw = (e) => {
    const pwdRegex = /^[A-Za-z0-9]{6,12}$/
    const pwCurrent = e.target.value
    setPw(pwCurrent)

    if (!pwdRegex.test(pwCurrent)) {
      setPwMessage('숫자+영문자 조합 6~12자리 이상 입력해주세요!.')
      setIsPw(false)
    } else {
      setPwMessage('안전한 비밀번호입니다')
      setIsPw(true)
    }
  }
  //패스워드 다시 체크
  const onChangePwConfirm = (e) => {
    const pwConfirmCurrent = e.target.value
    setPwCheck(pwConfirmCurrent)
    if (pw === pwConfirmCurrent) {
      setPwConfirmMessage('비밀번호를 똑같이 입력했어요!')
      setIsPwConfirm(true)
    } else {
      setPwConfirmMessage('비밀번호를 다시 확인해주세요!')
      setIsPwConfirm(false)
    }
  }
  const signUp = () => {
    if (!id || !pw || !pwCheck || !nick) {
      setSubmitted(true)
      return
    }
    if (isId && isNick && isPw && isPwConfirm) {
      alert('가입이 정상적으로 완료되었습니다!')
      props.history.push('/login')
    }
    dispatch(userActions.signupDB(id, pw, nick))
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
              value={id}
              padding="10px"
              placeholder="Id"
              _onChange={onChangeId}
            />
          </Grid>
          {id.length > 0 && (
            <Text
              align="left"
              size="12px"
              margin="0"
              color="#0583F2"
              className={`message ${isId ? 'success' : 'error'}`}
            >
              {idMessage}
            </Text>
          )}
          {submitted && !id ? (
            <Text align="left" size="12px" margin="0 0 10px" color="#CC0000">
              아이디를 입력해주세요
            </Text>
          ) : null}
          <Grid>
            <Input
              fcBorder
              id="nick"
              value={nick}
              padding="10px"
              label="Nickname"
              placeholder="Nickname"
              _onChange={onChangeNick}
            />
            {nick.length > 0 && (
              <Text
                align="left"
                size="12px"
                margin="0"
                color="#0583F2"
                className={`message ${isNick ? 'success' : 'error'}`}
              >
                {nickMessage}
              </Text>
            )}
            {submitted && !nick ? (
              <Text align="left" size="12px" margin="0 0 10px" color="#CC0000">
                닉네임을 입력해주세요
              </Text>
            ) : null}
            <Input
              fcBorder
              id="pw"
              value={pw}
              type="password"
              padding="10px"
              label="Password"
              placeholder="Password"
              _onChange={onChangePw}
            />
            {pw.length > 0 && (
              <Text
                align="left"
                size="12px"
                margin="0"
                color="#0583F2"
                className={`message ${isPw ? 'success' : 'error'}`}
              >
                {pwMessage}
              </Text>
            )}
            {submitted && !pw ? (
              <Text align="left" size="12px" margin="0 0 10px" color="#CC0000">
                패스워드를 입력해주세요
              </Text>
            ) : null}
            <Input
              fcBorder
              id="pwCheck"
              value={pwCheck}
              type="password"
              padding="10px"
              label="Password"
              placeholder="Password"
              _onChange={onChangePwConfirm}
            />
          </Grid>
          {pwCheck.length > 0 && (
            <Text
              align="left"
              size="12px"
              margin="0"
              color="#0583F2"
              className={`message ${isPwConfirm ? 'success' : 'error'}`}
            >
              {pwConfirmMessage}
            </Text>
          )}
          {submitted && !pwCheck ? (
            <Text align="left" size="12px" margin="0 0 10px" color="#CC0000">
              패스워드를 다시 입력해주세요
            </Text>
          ) : null}
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
      <GlobalStyle></GlobalStyle>
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
`

const SignUpForm = styled.div`
  display: flex;
  justify-conetent: center;
  flex-direction: column;
  text-align: center;
  width: 400px;
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
//test
