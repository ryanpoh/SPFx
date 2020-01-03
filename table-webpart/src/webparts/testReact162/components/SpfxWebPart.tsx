import * as React from "react";
import { ISpfxWebPartProps } from "./ISpfxWebPartProps";
import { ISpfxWebPartState } from "./ISpfxWebPartState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISchema } from "../ISchema";
import TableRowCells from "./TableRowCells";
import { Icon, Menu, Table } from "semantic-ui-react";

//TODO ENABLE STYLING. PLAY AROUND WITH EXTERNALS IN CONFIG.JS TO FIX FONTS (IF NOT USING CDN)
require("../../../../node_modules/semantic-ui-css/semantic.min.css");



export default class TestReact162 extends React.Component<
  ISpfxWebPartProps,
  ISpfxWebPartState
> {
  constructor(props: ISpfxWebPartProps) {
    super(props);
    this.state = { spListData: [] };
  }

  //? METHOD: FETCHING DATA FROM SHAREPOINT LIST VIA REST API.
  private getDataFromSPListDb(): Promise<ISchema[]> {
    return new Promise<ISchema[]>((resolve, reject) => {
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('TableList')/items?$select=Id,Title,e62k,j6ym,cyuk`;
      this.props.spHttpClient
        .get(endpoint, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((jsonResponse: any) => {
          let listFromSPDb: ISchema[] = [];
          for (let index = 0; index < jsonResponse.value.length; index++) {
            //?  TO GET INDEX NAMES SEE THE COLUMN NAME USING WEBSITE URL. IT WILL NOT CHANGE EVEN WHEN YOU RENAME IT.
            listFromSPDb.push({
              id: jsonResponse.value[index].Id,
              pid: jsonResponse.value[index].Title,
              eid: jsonResponse.value[index].e62k,
              department: jsonResponse.value[index].j6ym,
              guid: jsonResponse.value[index].cyuk
            });

            resolve(listFromSPDb);
          }
        });
    });
  }

  //? INITIAL FETCHING OF DATA INTO COMPONENT STATE
  public componentDidMount() {
    this.getDataFromSPListDb().then(listFromSPDb => {
      this.setState({ spListData: listFromSPDb });
    });
  }

  //? DYNAMIC UPDATING OF DATA INTO COMPONENT STATE EVERY 5 SECONDS
  public componentWillMount() {
    setInterval(
      () =>
        this.getDataFromSPListDb().then(listFromSPDb => {
          this.setState({ spListData: listFromSPDb });
        }),
      5000
    );
  }

  public render(): React.ReactElement<ISpfxWebPartProps> {
    return (
      <div>
        <h2>Perfomance Metrics</h2>

        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>PID</Table.HeaderCell>
              <Table.HeaderCell>Employee ID</Table.HeaderCell>
              <Table.HeaderCell>Department</Table.HeaderCell>
              <Table.HeaderCell>GUID</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.spListData.map(data => (
              <Table.Row key={data.id}>
                <TableRowCells data={data} />
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="4">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}
