import * as React from "react";
import Carousel from "semantic-ui-carousel-react";
import { Message } from "semantic-ui-react";

const MessageCarousel = props => {
  let messages = [];

  props.data.map(a => {
    messages.push({
      render: () => {
        return (
          <Message
            icon={a.icon}
            header={a.title}
            content={a.desc}
          />
        );
      }
    });
  });

  return (
    <React.Fragment>
      <Carousel
        elements={messages}
        duration={5000}
        animation="fly right"  //? Only 'fade' mode will keep the correct formatting.
        showNextPrev={false}
        showIndicators={true}
      />
    </React.Fragment>
  );
};

export default MessageCarousel;
