import React from 'react'
import { Grid, Text, Image } from '../elements/index'
import { history } from '../redux/configureStore'
import { changeTime } from '../shared/ChangeTime'
import ReactPlayer from 'react-player/lazy'
import styled from 'styled-components'
import SearchPost from '../components/SearchPost'
import Sidebar from '../components/Sidebar'
import { useSelector } from 'react-redux'

const SearchPage = (props) => {
  const list = useSelector((state) => state.post.search)
  console.log(list)

  return (
    <>
      <Sidebar />
      <SearchList>
        <Hr />
        {list ? (
          list.map((post, i) => {
            return <SearchPost {...post} />
          })
        ) : (
          <>
            <Text color="#fff" size="30px" weight="700">
              텅텅...비디오를 올려주세요
            </Text>
          </>
        )}
      </SearchList>
    </>
  )
}

const SearchList = styled.div`
  margin: 0 auto;
  width: 60%;
`

const Hr = styled.hr`
  border: none;
  height: 0.3px;
  color: #3d3d3d;
  background-color: #3d3d3d;
  margin: 10px;
`
export default SearchPage
