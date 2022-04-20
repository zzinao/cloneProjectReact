import React from 'react'
import { Grid, Text, Image } from '../elements/index'
import { history } from '../redux/configureStore'
import { changeTime } from '../shared/ChangeTime'
import ReactPlayer from 'react-player/lazy'
import styled from 'styled-components'
import SearchPost from '../components/SearchPost'
import { useSelector } from 'react-redux'

const SearchPage = (props) => {
  const test = useSelector((state) => state.post)
  console.log(test)
  return (
    <></>
    // <React.Fragment>
    //   {list ? (
    //     list.map((post, i) => {
    //       return (
    //         <VideoList key={post._id}>
    //           <SearchPost {...post} />
    //         </VideoList>
    //       )
    //     })
    //   ) : (
    //     <>
    //       <Text color="#fff" size="30px" weight="700">
    //         텅텅...비디오를 올려주세요
    //       </Text>
    //     </>
    //   )}
    // </React.Fragment>
  )
}

const VideoList = styled.div``
export default SearchPage
