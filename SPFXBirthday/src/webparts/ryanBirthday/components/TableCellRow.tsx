import * as React from "react";
import { Header, Image, Table } from "semantic-ui-react";

const TableCellRow = props => {
  return (
    <Table.Row key={props.data.id}>
      <Table.Cell>
        <Header as="h4" image>
          <Image src={props.data.image} rounded size="mini" />
          <Header.Content>
            {props.data.name}
            <Header.Subheader>{props.data.department}</Header.Subheader>
          </Header.Content>
        </Header>
      </Table.Cell>
      <Table.Cell>{props.data.date}</Table.Cell>
    </Table.Row>
  );
};

export default TableCellRow;
