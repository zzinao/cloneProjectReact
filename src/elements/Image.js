//커밋
import React from 'react';
import styled from 'styled-components';

const Image = (props) => {
  const { width, shape, src, src_01, src_02, size, border } = props;
  const styles = {
    src: src,
    src_01: src_01,
    src_02: src_02,
    size: size,
    border: border,
    width: width,
  };

  if (shape === 'rectangle') {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  if (shape === 'circle') {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  return (
    <React.Fragment>
      <ImageDefault {...styles}></ImageDefault>
    </React.Fragment>
  );
};
Image.defaultProps = {
  shape: '',
  src: 'https://i.pinimg.com/564x/fa/be/26/fabe26775b55a71fd1426f88b5a13e7b.jpg',
  src_01:
    'https://image.msscdn.net/images/style/detail/26197/detail_26197_1_500.jpg',
  src_02: '',
  size: 36,
  border: false,
};

//기본 정사각형
const ImageDefault = styled.div`
  width: 100%;
  height: 90vh;
  background-image: url('${(props) => props.src}');
  background-size: contain;
  background-position: top;
  ${(props) => (props.border ? `border: ${props.border};` : '')}
`;

//4:3비율 직사각형
const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
  /* border: 1px solid red; */
`;
const AspectInner = styled.div`
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
  ${(props) => (props.border ? `border: ${props.border};` : '')}

  background-image: url("${(props) => props.src_01}");
  background-size: cover;
  background-position: top;
  margin: 4px;
`;

export default Image;
