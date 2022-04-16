import React from 'react'
import styled from 'styled-components'

const Button = (props) => {
  const { _onClick, children, _id, ...styles } = props
  return (
    <ElButton onClick={_onClick} id={_id} {...styles}>
      {children}
    </ElButton>
  )
}

Button.defaultProps = {
  _id: '',
  children: null,
  _onClick: () => {},
  margin: false,
  width: '100%',
  padding: '12px 0px',
  _color: false,
  bg: false,
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
  border-radius: 10px;
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
`
export default Button
