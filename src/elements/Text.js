import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { children, bold, color, size, margin, textAlign, display } = props;
  const styles = {
    bold: bold,
    color: color,
    size: size,
    margin: margin,
    textAlign: textAlign,
    display: display,
  };

  return <P {...styles}>{children}</P>;
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#67686a",
  size: "14px",
  margin: "0px",
  textAlign: false,
  display: "",
};

const P = styled.p`
  display: ${(props) => props.display};
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold ? "600" : "400")};
  margin: ${(props) => props.margin};
  text-align: ${(props) => props.textAlign};
`;

export default Text;
