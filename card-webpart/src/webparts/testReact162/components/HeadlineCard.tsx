import * as React from "react";
import { Card, Icon } from "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css';
// var css = require("style-loader!css-loader!../../../../node_modules/semantic-ui-css/semantic.min.css");
// require("../styles/site.css");

const HeadlineCard = props => {
  const extra = (
    <a>
      <Icon name={props.icon} />
      {props.extra}
    </a>
  );

  return (
    <Card
      image={props.image}
      header={props.header}
      meta={props.meta}
      description={props.description}
      extra={extra}
    />
  );
};

export default HeadlineCard;
