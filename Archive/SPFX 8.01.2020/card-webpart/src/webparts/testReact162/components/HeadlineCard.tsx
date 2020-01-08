import * as React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

const descStyle = {
  color: "green"
};

const HeadlineCard = props => {
  return (
    <Card stretched>
      <Image src={props.image} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{props.header}</Card.Header>
        <br />
        <Card.Meta>
          <span className="date">{props.meta}</span>
        </Card.Meta>
        <Card.Description>
          <span style={descStyle}> {props.description} </span>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name={props.icon} />
          {props.extra}
        </a>
      </Card.Content>
    </Card>
  );
};

export default HeadlineCard;
