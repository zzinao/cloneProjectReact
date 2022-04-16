import React from 'react'
import styled from 'styled-components'

const FocusInput = (props) => {
  const { label } = props
  return (
    <Ptag>
      <InputField />
      <Label>
        <Span>{label}</Span>
      </Label>
    </Ptag>
  )
}

FocusInput.defaultProps = {
  label: '',
}

const Ptag = styled.p`
  margin: 100px auto 0;
  position: relative;
  width: 50%;
  height: 50px;
`

const InputField = styled.input`
  box-sizing: border-box;
  padding: 20px 0 0;
  width: 100%;
  height: 100%;
  border: 0 none;
  color: #595f63;
  outline: none;
`
const Label = styled.label`
  position: absolute;
  left: 0%;
  bottom: 0;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #000;
  text-align: left;
  pointer-events: none;
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 0;
    height: 100%;
    border: 3px solid #5fa8d3;
    transition: all 0.3s ease;
  }
`
const Span = styled.span`
  position: absolute;
  left: 0;
  bottom: 5px;
  transition: all 0.3s ease;
`
export default FocusInput
