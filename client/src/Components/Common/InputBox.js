import React from "react";
import styled from "styled-components";

const Input = styled.input`
  padding: 8px;
  font-size: 0.8rem;
  border: 1px solid #768091;
  border-radius: 4px;
  width: 250px;
`;
const InputBox = ({ placeholder, onChange, value }) => {
  return (
    <div>
      <Input
        data-testid="input-box"
        type="text"
        value={value}
        onChange={(v) => {
          if (onChange) onChange(v.target.value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBox;
