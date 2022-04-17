import React from 'react'
import styled from 'styled-components'

const Button = (props) => {
  const {
    text,
    _onClick,
    is_float,
    children,
    margin,
    width,
    padding,
    _id,
    bg,
    fontSize,
  } = props

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    bg: bg,
    fontSize: fontSize,
  }

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    )
  }

  return (
    <ElButton onClick={_onClick} id={_id} {...styles}>
      {text ? text : children}
    </ElButton>
  )
}

Button.defaultProps = {
  text: false,
  _id: '',
  children: null,
  _onClick: () => {},
  margin: false,
  width: '100%',
  padding: '12px 0px',
  _color: false,
  bg: false,
  fontSize: '',
}

const ElButton = styled.button`
  cursor: pointer;
  font-size: 18px;
  ${(props) => (props.width ? `width: ${props.width};` : '100px')};
  ${(props) => (props.bg ? `background: ${props.bg};` : `background: #212121;`)}
  ${(props) =>
    props.color
      ? `color: ${props.color};`
      : `color: #fff;`}
  box-sizing: border-box;
  padding: ${(props) => props.padding};
  border: none;
  border-radius: 2px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) =>
    props.fontSize ? `font-size: ${props.fontSize};` : `font-size : 15px`}
`

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 50px;
  right: 16px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
`
export default Button
