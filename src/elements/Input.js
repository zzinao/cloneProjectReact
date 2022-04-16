import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./";

const Input = (props) => {
  const { label, placeholder, _onChange, type, multiLine, value } = props;

  if (multiLine) {
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}{" "}
        {/*라벨에 조건문을 걸어서 글을 쓸때만 나오게 합니다.*/}
        <ElTextarea
          rows={5}
          value={value}
          placeholder={placeholder}
          onChange={_onChange}
        />
      </Grid>
    );
  }

  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}{" "}
        {/*라벨에 조건문을 걸어서 글을 쓸때만 나오게 합니다.*/}
        <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  value: "",
  _onChange: () => {},
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;
const ElInput = styled.input`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;

export default Input;
