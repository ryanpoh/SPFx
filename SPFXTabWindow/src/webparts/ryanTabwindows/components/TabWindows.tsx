import * as React from "react";
import { Label, Menu, Tab, Item, Image, Icon, Button } from "semantic-ui-react";
import ArticleModal from "./ArticleModal";

const paragraphPlaceholder = (
  <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
);
const imagePlaceholder =
  "https://react.semantic-ui.com/images/wireframe/image.png";

const getItems = arrObj => {
  return arrObj.map(obj => (
    <Item>
      <Item.Image src={obj.image ? obj.image : imagePlaceholder} />
      <Item.Content>
        <Item.Header as="a">{obj.title}</Item.Header>
        <Item.Meta>
          <span className="cinema">{obj.meta}</span>
        </Item.Meta>
        <Item.Description>
          <p>
            {obj.paragraph
              ? obj.paragraph.slice(0, 200) + "..."
              : paragraphPlaceholder}
          </p>
        </Item.Description>
        <Item.Extra>
          <ArticleModal obj={obj} />
          <Label>{obj.tag}</Label>
          <Label icon={obj.labelIcon} content={obj.labelContent} />
        </Item.Extra>
      </Item.Content>
    </Item>
  ));
};

const generatePanes = arrObj => [
  {
    menuItem: { key: "news", icon: "newspaper", content: "News" },
    render: () => (
      <Tab.Pane>
        <Item.Group divided>
          {getItems(arrObj.filter(obj => obj.pane == 1))}
        </Item.Group>
      </Tab.Pane>
    )
  },
  {
    menuItem: (
      <Menu.Item key="messages">
        Development<Label>{arrObj.filter(obj => obj.pane == 2).length}</Label>
      </Menu.Item>
    ),
    render: () => (
      <Tab.Pane>
        <Item.Group divided>
          {getItems(arrObj.filter(obj => obj.pane == 2))}
        </Item.Group>
      </Tab.Pane>
    )
  }
];

//? Images must be square for consistency.
const TabWindows = props => (
  <React.Fragment>
    <a
      style={{ float: "right" }}
      href={`${props.siteCollectionUrl}/Lists/TabwindowsList/AllItems.aspx`}
    >
      View All
    </a>
    <Tab panes={generatePanes(props.data)} />
  </React.Fragment>
);

export default TabWindows;
