import React from 'react'
import { MdSearch } from 'react-icons/md'
import { Grid, Input, Text, Button, Image } from '../elements/index'
import styled from 'styled-components'
import { actionCreators as postActions } from '../redux/modules/post'
import { useDispatch, useSelector } from 'react-redux'
import { history } from '../redux/configureStore'

const Search = () => {
  const dispatch = useDispatch()
  const searchRef = React.useRef(null)

  const handleSearch = () => {
    const searchWord = searchRef.current.value
    dispatch(postActions.searchDB(searchWord))
    history.push(`/search/${searchWord}`)
  }

  return (
    <>
      <Form>
        <InputField type="text" placeholder="검색" ref={searchRef} />
        <SearchBtn onClick={handleSearch}>
          <MdSearch size="26" color="#fff" className="icons" />
        </SearchBtn>
      </Form>
    </>
  )
}

const Form = styled.div`
  flex: 0.6;
  display: flex;
  padding: 0.1rem;
  margin: 3em;
  border-radius: 2px;
  border: 0.5px solid #3d3d3d;
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

export default Search
