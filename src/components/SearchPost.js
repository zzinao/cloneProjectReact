import React from 'react'
import { Image, Text, Grid } from '../elements/index'
import { history } from '../redux/configureStore'
import styled from 'styled-components'
import { changeTime } from '../shared/ChangeTime'
// import ReactPlayer from 'react-player/lazy'

const SearchPost = (props) => {
  console.log(props)
  return (
    <>
      <Container
        onClick={() => {
          history.push(`/detail/${props.postNum}`)
        }}
      >
        <Grid isFlex_top>
          <Image src_01={props.postThumb} minWidth="400px" shape="rectangle" />

          <Grid _flexColumn margin="0 30px;">
            <Text margin="0" size="18px" weight="700" color="#fff">
              {props.postTitle}
            </Text>
            <Text size="12px" color="#aaa">
              조회수 {props.postCnt} &nbsp; {changeTime(props.postDate)}
            </Text>

            <Grid isFlex_start>
              <Image
                shape="profile"
                src_01={props.userInfo?.userProfile}
                margin="0 15px 0 0"
                size="28"
              />
              <Text size="12px" color="#aaa">
                {props?.userInfo?.userNick}
              </Text>
            </Grid>

            <Text size="12px" color="#aaa">
              {props.postDesc}
            </Text>
          </Grid>
        </Grid>

        {/* <Image shape="rectangle" scr_01={props.postThumb} /> */}
        {/* <Preview src={props.postThumb} /> */}
        {/* <ReactPlayer url={props.postVideo} playing={false} muted={false} /> */}
      </Container>
    </>
  )
}

const Container = styled.div`
  // width: 293px;
  margin: 30px;
  cursor: pointer;
`

const Preview = styled.div`
  width: 100%;
  height: 180px;
  background-color: #aaa;
`

const Parent = styled.div`
  // display: flex;
  // align-items: flex-start;
  // height: 50px;
  // margin: 10px 0 0;
`
const TitleBox = styled.div`
  display: flex;
`

export default SearchPost
