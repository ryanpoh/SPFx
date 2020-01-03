import * as React from "react";
import { Table } from "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css';
// var css = require("style-loader!css-loader!../../../../node_modules/semantic-ui-css/semantic.min.css");
// require("../styles/site.css");

const TableRowCells = props => {
  return (
    <React.Fragment>
      <Table.Cell>{props.data.pid}</Table.Cell>
      <Table.Cell>{props.data.eid}</Table.Cell>
      <Table.Cell>{props.data.department}</Table.Cell>
      <Table.Cell>{props.data.guid}</Table.Cell>
    </React.Fragment>
  );
};

export default TableRowCells;
