import * as React from "react";
import Carousel from "semantic-ui-carousel-react";
import { Button } from "semantic-ui-react";

const MessageCarousel = props => {

  let messages = [];

  props.data.map(a => {
    messages.push(
      {
        render: () => {
          return <Button fluid>{a.title}</Button>
        }
      })
  });

  return (
    <React.Fragment>
      <Carousel
        elements={messages}
        duration={3000}
        animation="fade right"
        showNextPrev={false}
        showIndicators={true}
      />
    </React.Fragment>
  );
};

export default MessageCarousel;
