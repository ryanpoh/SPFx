import * as React from "react";
import { Button, Header, Image, Modal, Icon } from "semantic-ui-react";

const ArticleModal = props => (
  <Modal
    trigger={
      <Button primary floated="right">
        {props.obj.buttonContent}
        <Icon name={props.obj.buttonIcon} />
      </Button>
    }
  >
    <Modal.Header>SRKK News</Modal.Header>
    <Modal.Content image>
      <Image size="medium" src={props.obj.image} />
      <Modal.Description>
        <Header>{props.obj.title}</Header>
        <p></p>
        <p>{props.obj.paragraph}</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

export default ArticleModal;
