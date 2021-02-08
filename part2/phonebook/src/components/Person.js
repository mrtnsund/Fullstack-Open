import { Button } from "@blueprintjs/core";
import React from "react";
const Person = (props) => {
  return (
    <tr>
      <td>{props.person.name}</td>
      <td>{props.person.number}</td>
      <td>
        <Button intent="danger" onClick={props.onSubmit}>delete</Button>
      </td>
    </tr>
  );
};

export default Person;
