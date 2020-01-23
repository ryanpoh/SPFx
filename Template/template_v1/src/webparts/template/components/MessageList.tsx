import * as React from "react";
import { Message } from "semantic-ui-react";

const MesssageList = props => {
  return (
    <Message color="teal">
      <Message.Header>I am a Message List</Message.Header>
      <Message.List>
        {props.data.map(obj => {
          return <Message.Item>{obj.item}</Message.Item>;
        })}
      </Message.List>
    </Message>
  );
};

export default MesssageList;
