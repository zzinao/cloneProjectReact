import React from 'react';
import styled from 'styled-components';
import profile from '../shared/img/black_profile.png';

const Image = (props) => {
  const { width, shape, src, src_01, src_02, size, border, margin } = props;

  const styles = {
    src: src,
    src_01: src_01,
    src_02: src_02,
    size: size,
    border: border,
    width: width,
    margin: margin,
  };

  if (shape === 'profile') {
    return <ImageCircle {...styles}></ImageCircle>;
  }
  if (shape === 'rectangle') {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }
  return (
    <>
      <ImageDefault {...styles}></ImageDefault>
    </>
  );
};

Image.defaultProps = {
  shape: '',
  src: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',

  src_01:
    'https://image.msscdn.net/images/style/detail/26197/detail_26197_1_500.jpg',
  src_02: '',
  margin: '',
  size: 30,
  width: '',
};

//기본 정사각형
const ImageDefault = styled.div`
  width: 100%;
  background-image: url('${(props) => props.src}');
  background-size: contain;
  background-position: top;
  ${(props) => (props.border ? `border: ${props.border};` : '')}
`;

//4:3비율 직사각형
const AspectOutter = styled.div`
  min-width: 200px;
  /* border: 1px solid red; */
`;
const AspectInner = styled.div`
  ${(props) => (props.width ? `width: ${props.width};` : '')}
  position: relative;
  padding-top: 100%;
  overflow: hidden;
  background-image: url('${(props) => props.src_02}');
  background-size: cover;
  background-position: top;
  /* border: 1px solid green; */
`;

//원형
const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  background-image: url('${(props) => props.src}');
  background-size: cover;
  ${(props) => (props.margin ? `margin: ${props.margin};` : null)}
  ${(props) => (props.border ? `border: ${props.border};` : '')}
background-image: url("${(props) => props.src_01}");
`;

export default Image;
