import * as React from "react";
import { Message } from "semantic-ui-react";

const HeaderList = props => {
  return (
    <Message.List>
      {props.data.map(obj => {
        return <Message.Item>{obj.items}</Message.Item>;
      })}
    </Message.List>
  );
};

export default HeaderList;
