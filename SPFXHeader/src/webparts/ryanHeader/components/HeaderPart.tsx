import * as React from "react";
import { Header, Image, Table } from "semantic-ui-react";

const TableCellRow = props => {
  return (
    <React.Fragment>
        <Header as="h4" image>
          <Image src={props.data.image} rounded size="mini" />
          <Header.Content>
            {props.data.name}
            <Header.Subheader>{props.data.department}</Header.Subheader>
          </Header.Content>
        </Header>
    </React.Fragment>
  );
};

export default TableCellRow;
