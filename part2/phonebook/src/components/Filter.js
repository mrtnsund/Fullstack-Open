import { InputGroup, Text } from "@blueprintjs/core";
import React from "react";

import "../index.css";
const Filter = ({ onChange, value }) => {
  return (
    <div>
      <Text>Filter shown with:</Text>
      <InputGroup
        className="input"
        id="text-input"
        placeholder={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Filter;
