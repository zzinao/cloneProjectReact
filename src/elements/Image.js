import React from 'react'
import styled from 'styled-components'
import profile from '../shared/img/black_profile.png'

const Image = (props) => {
  const { shape, src, size, margin } = props

  const styles = {
    src: src,
    size: size,
    margin: margin,
  }

  if (shape === 'profile') {
    return <ImageCircle {...styles}></ImageCircle>
  }
  if (shape === 'preivew') {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    )
  }

  return <></>
}

Image.defaultProps = {
  shape: 'circle',
  src:
    'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
  size: 30,
  margin: false,
}

const AspectOutter = styled.div`
width: 100%
min-width: 250px;
`
const AspectInner = styled.div`
position: relative;
background-image: url("${(props) => props.src}");
background-size: cover;
background-repeat: no-repeat;
background-position: center;
overflow: hidden;
`
const ImageCircle = styled.div`
--size: ${(props) => props.size}px;
width: var(--size);
height: var(--size);
border-radius: var(--size);
background-image: url("${(props) => props.src}");
background-size: cover;
${(props) => (props.margin ? `margin: ${props.margin};` : null)}
`

export default Image
