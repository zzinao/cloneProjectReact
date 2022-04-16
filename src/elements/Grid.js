//커밋
import { normalizeUnits } from 'moment';
import React from 'react';
import styled from 'styled-components';

const Grid_ = (props) => {
  const {
    children,
    is_flex,
    width,
    height,
    padding,
    margin,
    border,
    bg,
    center,
    right,
    scroll,
    _onClick,
    fix,
  } = props;

  const styles = {
    is_flex: is_flex,
    width: width,
    height: height,
    margin: margin,
    padding: padding,
    border: border,
    bg: bg,
    center: center,
    scroll: scroll,
    right: right,
    fix: fix,
  };

  return (
    <GridBox {...styles} onClick={_onClick}>
      {children}
    </GridBox>
  );
};

Grid_.defaultProps = {
  children: null,
  is_flex: false,
  width: '100%',
  height: '100%',
  padding: false,
  margin: false,
  border: false,
  bg: false,
  center: false,
  right: false,
  scroll: false,
  fix: false,
  _onClick: () => {},
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : '')}
  ${(props) => (props.margin ? `margin: ${props.margin};` : '')}
  ${(props) => (props.border ? `border: ${props.border};` : '')}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : '')}
  ${(props) =>
    props.is_flex
      ? `display:flex; align-items:center; justify-content:space-between;`
      : ''}
  ${(props) => (props.center ? `text-align:center;` : '')}
  ${(props) => (props.right ? `text-align:right;` : '')}
  ${(props) => (props.scroll ? `overflow-y:scroll;` : '')}
  ${(props) =>
    props.fix
      ? `position:fixed; top:0; left:0; width:100%; height:100px; z-index:1;`
      : ''}
`;

export default Grid_;
