import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
  const { children, ...styles } = props;
  return (
    <>
      <Ptag {...styles}>{children}</Ptag>
    </>
  );
};

Text.defaultProps = {
  children: null,
  bold: false,
  size: '16px',
  color: '#222831',
  margin: false,
  center: false,
  weight: false,
  _cusor: false,
};

const Ptag = styled.p`
  color: ${(props) => props.color};
  ${(props) => (props.size ? `font-size: ${props.size};` : null)}
  ${(props) =>
    props.weight ? `font-weight:${props.weight};` : 'font-weight: 400;'};
  ${(props) => (props.margin ? `margin:${props.margin};` : '')}
  ${(props) => (props.center ? `text-align: center;` : '')}
  ${(props) => (props.align ? `text-align: ${props.align};` : '')}
  ${(props) => (props._cursor ? `cursor: pointer;` : null)};
`;

export default Text;
