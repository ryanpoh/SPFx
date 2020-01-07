import * as React from "react";
import { ISpfxWebPartProps } from "./ISpfxWebPartProps";
import { ISpfxWebPartState } from "./ISpfxWebPartState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISchema } from "../ISchema";
import TableCellRow from "./HeadlineCard";
import { Table } from "semantic-ui-react";

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
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('PTableList')/items?$select=Id,Title,image,department,yos`;
      this.props.spHttpClient
        .get(endpoint, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((jsonResponse: any) => {
          let listFromSPDb: ISchema[] = [];
          for (let index = 0; index < jsonResponse.value.length; index++) {
            //?  TO GET INDEX NAMES SEE THE COLUMN NAME USING WEBSITE URL. IT WILL NOT CHANGE EVEN WHEN YOU RENAME IT. HEX FORMAT CANNOT ALSO.
            listFromSPDb.push({
              id: jsonResponse.value[index].Id,
              name: jsonResponse.value[index].Title,
              image: jsonResponse.value[index].image,
              department: jsonResponse.value[index].department,
              yos: jsonResponse.value[index].yos
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
        <h2>Smol Table</h2>

        <Table basic="very" celled collapsing>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Direct Reports</Table.HeaderCell>
              <Table.HeaderCell>Years of Service</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.state.spListData.map(data => (
              <TableCellRow data={data} />
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
