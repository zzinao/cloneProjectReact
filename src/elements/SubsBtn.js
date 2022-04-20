import React from 'react'
import { actionCreators as postAction } from '../redux/modules/like'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button } from './index'

const SubsBtn = (props) => {
  const dispatch = useDispatch()
  const userSub = props.userInfo?.userId
  const subCheck = props.subscribeCheck

  const [subs, setSubs] = React.useState(subCheck)

  console.log(subCheck, !subs)

  const toggleSubs = () => {
    // if (subs) {
    dispatch(postAction.getSubsDB(userSub, subs))
    setSubs(!subs)
  }
  //   }

  return (
    <>
      <Button
        width="50px"
        padding="5px 10px"
        marign="0"
        text="구독"
        bg="#CC0000"
        _onClick={toggleSubs}
      ></Button>
    </>
  )
}

export default SubsBtn
