import React from 'react'
import { actionCreators as postAction } from '../redux/modules/like'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from './index'

const SubsBtn = (props) => {
  const dispatch = useDispatch()
  const userSub = props.userId
  const subCheck = props.subscribeCheck

  console.log(props)

  console.log(subCheck, userSub)
 const is_token = localStorage.getItem('token') ? true : false
  const toggleSubs = () => {

      dispatch(postAction.getSubsDB(userSub, subCheck))
  
  }
  //   }
  return (
    <>
      <Button
        width="50px"
        padding="5px 10px"
        marign="0"
        text="구독"
        bg={subCheck ? '#aaa' : '#CC0000'}
        _onClick={toggleSubs}
      ></Button>
    </>
  )
}

export default SubsBtn
