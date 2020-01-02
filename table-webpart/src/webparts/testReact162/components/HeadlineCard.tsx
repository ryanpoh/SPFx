import * as React from "react";
import { Card, Icon } from "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css';
// var css = require("style-loader!css-loader!../../../../node_modules/semantic-ui-css/semantic.min.css");
// require("../styles/site.css");

const HeadlineCard = props => {
  const extra = (
    <a>
      <Icon name="user" />
      16 Friends
    </a>
  );

  return (
    <Card
      image="https://react.semantic-ui.com/images/avatar/large/elliot.jpg"
      header="Elliot Baker"
      meta="Friend"
      description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
      extra={extra}
    />
  );
};

export default HeadlineCard;
