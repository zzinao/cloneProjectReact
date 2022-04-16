import React from 'react'
import styled from 'styled-components'
import profile from '../shared/img/black_profile.png'

const Image = (props) => {
  const { _onClick, ...styles } = props
  return <AspectOutter {...styles}></AspectOutter>
}

Image.defaultProps = {
  src: profile,
  size: 30,
}
const AspectOutter = styled.div`
position: relative,
background-image: ${(props) => props.src};
background-size: cover;
background-repeat: no-repeat;
background-position: center;
overflow: hidden;
border-radius: 75%
`

export default Image
