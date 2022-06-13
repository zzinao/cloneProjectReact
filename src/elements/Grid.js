import React from 'react'
import styled from 'styled-components'

const Grid = (props) => {
  const { children, _onClick, _id, ...styles } = props
  if (_id) {
    return (
      <GridBox onClick={_onClick} id={_id} {...styles}>
        {children}
      </GridBox>
    )
  }
  return (
    <GridBox onClick={_onClick} {...styles}>
      {children}
    </GridBox>
  )
}

Grid.defaultProps = {
  _id: '',
  children: null,
  isFlex: false,
  isFlex_center: false,
  isFlex_start: false,
  isFlex_end: false,
  isFlex_top: false,
  width: '100%',
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _onClick: () => {},
  _cursor: false,
  flexColumn: false,
  _flexColumn: false,
}

const GridBox = styled.div`
${(props) => (props._cursor ? `cursor: pointer;` : null)};
${(props) =>
  props.isFlex
    ? `display: flex; align-items: center; justify-content: space-between;`
    : null}
${(props) =>
  props.isFlex_center
    ? `display: flex; align-items: center; justify-content: center;`
    : null}
${(props) =>
  props.isFlex_start
    ? `display: flex; align-items: center; justify-content: start;`
    : null}
${(props) =>
  props.isFlex_top ? `display: flex; justify-content: start;` : null}
${(props) =>
  props.isFlex_end
    ? `display: flex; align-items: center; justify-content: end;`
    : null}
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : null)}
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  ${(props) => (props.bg ? `background: ${props.bg};` : null)}
  ${(props) => (props.center ? `text-align: center;` : '')}
  ${(props) => (props.float ? `float: left` : null)}
  ${(props) =>
    props.flexColumn
      ? `display: flex; flex-direction: column; justify-content: center; align-items: center;`
      : null};
      ${(props) =>
        props._flexColumn
          ? `display: flex; flex-direction: column; justify-content: center; `
          : null};
    
`

export default Grid
