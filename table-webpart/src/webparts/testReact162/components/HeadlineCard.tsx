import * as React from "react";
import { Table } from "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css';
// var css = require("style-loader!css-loader!../../../../node_modules/semantic-ui-css/semantic.min.css");
// require("../styles/site.css");

const TableRowCells = props => {
  return (
    <React.Fragment>
      <Table.Cell>Cell</Table.Cell>
      <Table.Cell>Cell</Table.Cell>
      <Table.Cell>Cell</Table.Cell>
    </React.Fragment>
  );
};

export default TableRowCells;
