import React from 'react'
import styled from 'styled-components'

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    value,
    autoComplete,
    height,
    id = '',
    clickColor,
    disabled,
    fontSize,
    padding,
    fcBorder,
  } = props

  const styles = {
    clickColor: clickColor,
    height: height,
    fontSize: fontSize,
    padding: padding,
    fcBorder: fcBorder,
  }

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <InputField
        id={id}
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        value={value}
        disabled={disabled}
        autoComplete={autoComplete}
        {...styles}
      />
    </>
  )
}

Input.defaultProps = {
  disabled: false,
  label: '',
  placeholde: '텍스트를 입력하세요',
  _onChange: () => {},
  type: 'text',
  value: '',
  autoComplete: 'on',
  clickColor: '',
  height: '',
  width: '',
  id: '',
  fontSize: '',
  fcBorder: false,
}
const InputLabel = styled.small`
  color: #aaa;
  display: flex;
  flex-direction: column;
  float: left;
`

const InputField = styled.input`
  background-color: #fff;
  border: 1px solid #eee;
  color: #555;
  margin: 10px 0px;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 0px;
  position: relative;
  ${(props) => (props.width ? `width: ${props.width};` : `width: 100%;`)};
  ${(props) => (props.height ? `height: ${props.height};` : `height: 40px;`)};
  ${(props) => (props.fontSize ? `font-size: ${props.fontSize};` : null)}
  ${(props) => (props.padding ? `padding: ${props.padding};` : null)}

  &:focus {
    outline: none !important;
    ${(props) =>
      props.fcBorder
        ? `border: 2px solid #037BFF; box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px; transition-duration: 0.1s`
        : ''};
    ${(props) =>
      props.clickColor ? `color: ${props.clickColor}!important;` : ''};
  }
`

export default Input
