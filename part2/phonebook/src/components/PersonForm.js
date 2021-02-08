import { Button, InputGroup, Text } from "@blueprintjs/core";
import React from "react";

const PersonForm = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <Text>Name: {" "}</Text>
                <InputGroup
                  id="text-input"
                  placeholder={props.valueName}
                  onChange={props.onChangeName}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Text>Number: {" "}</Text>
            
                <InputGroup
                  id="text-input"
                  placeholder={props.valueNumber}
                  onChange={props.onChangeNumber}
                />
 
              </td>
            </tr>
          </tbody>
        </table>
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
};

export default PersonForm;
