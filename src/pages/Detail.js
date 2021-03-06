import React from 'react'
import { Grid, Text, Image, Button, SubsBtn } from '../elements/index'
import LikeIcon from '../components/LikeIcon'
import DisLikeIcon from '../components/DisLikeIcon'
import { useParams } from 'react-router-dom'
import Header from '../shared/Header'
import styled from 'styled-components'
import CommentWrite from '../components/CommentWrite'
import CommentList from '../components/CommentList'
import { history } from '../redux/configureStore'
import { changeTime } from '../shared/ChangeTime'
import { actionCreators as postActions } from '../redux/modules/post'
import { useSelector, useDispatch } from 'react-redux'
import ReactPlayer from 'react-player/lazy'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const Detail = (props) => {
  const { postNum } = useParams()
  const dispatch = useDispatch()

  const detail = useSelector((state) => state.post.detail)
  const user_info = useSelector((state) => state?.user)
  const is_login = useSelector((state) => state?.user?.is_login)

  //게시물 불러오기
  React.useEffect(() => {
    dispatch(postActions.getOnePostDB(postNum))
  }, [])
  if (detail) {
    return (
      <>
        <Header />
        <ReactPlayer
          url={detail?.postVideo}
          playing={true}
          muted={false}
          light={true}
          controls
          width={'100%'}
          className="detail_video"
        />
        {/* <Preview /> */}
        <Container>
          <TitleBox>
            <Text weight="700" size="22px" color="#fff" margin="20px 0 0">
              {detail?.postTitle}
            </Text>
            <Grid isFlex>
              <Text color="#aaa" size="14px" margin="10px 0 20px">
                조회수 {detail?.postCnt}회 &nbsp; 업로드{' '}
                {changeTime(detail?.postDate)}
              </Text>
              <Grid isFlex>
                <LikeIcon {...detail} />
                <DisLikeIcon {...detail} />
                <CopyToClipboard>
                  <Text color="#fff" weight="700" margin=" 0 8px">
                    공유
                  </Text>
                </CopyToClipboard>
                {/* 게시물 삭제 */}
                {is_login ? (
                  detail?.userId === user_info?.user?.userId ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (
                          window.confirm('게시물을 삭제하시겠어요?') === true
                        ) {
                          dispatch(postActions.deletePostDB(postNum))
                        }
                      }}
                    >
                      삭제
                    </button>
                  ) : null
                ) : null}
                {/* 게시물 수정 */}
                {is_login ? (
                  detail?.userId === user_info?.user?.userId ? (
                    <button
                      onClick={() => {
                        history.push(`/postWrite/${postNum}`)
                      }}
                    >
                      수정
                    </button>
                  ) : null
                ) : null}
              </Grid>
            </Grid>
          </TitleBox>

          <Hr />

          <UserInfoBox>
            <Parent>
              <Image
                shape="profile"
                src_01={detail?.userProfile}
                margin="5px 20px 0 0"
                size="50"
              />
              <ContentBox>
                <Grid isFlex_start>
                  <Text
                    margin="0 30px 0 0"
                    size="16px"
                    weight="700"
                    color="#fff"
                  >
                    {detail?.userNick}
                  </Text>
                  <SubsBtn {...detail} />
                </Grid>
                <Text margin="3px 0" size="12px" color="#aaa" weight="500">
                  구독자수 {detail?.userSubscribe}
                </Text>
                <Text margin="25px 0" color="#fff" size="15px">
                  {detail?.postDesc}
                </Text>
              </ContentBox>
            </Parent>
          </UserInfoBox>
          <Hr />
          <CommentBox>
            <Text color="#fff" weight="700">
              댓글 {detail?.postCommentNum}개
            </Text>
            <CommentWrite {...postNum} />
            <CommentList {...postNum} />
          </CommentBox>
        </Container>
      </>
    )
  }
  {
    return (
      <div>
        <Text color="#fff">......</Text>
      </div>
    )
  }
}
const Container = styled.div`
  padding: 10px 40px;
`

const TitleBox = styled.div``

const CommentBox = styled.div``

const Hr = styled.hr`
  border: none;
  height: 0.3px;
  color: #3d3d3d;
  background-color: #3d3d3d;
`

const UserInfoBox = styled.div`
margin 20px 0`

const ContentBox = styled.div`
margin: 5px;
font-size: 1em;
font-weigth: bold;
left: 30%,
display: inline-block;
`

const Parent = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 10px 0 0;
`

export default Detail
