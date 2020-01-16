import * as React from "react";
import { IRyanTablepageProps } from "./IRyanTablepageProps";
import { IRyanTablepageState } from "./IRyanTablepageState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISchema } from "../ISchema";
import TableRowCells from "./TableRowCells";
import { Icon, Menu, Table } from "semantic-ui-react";
import axios from "../axios-license";
import { Message } from "semantic-ui-react";

//TODO ENABLE STYLING. PLAY AROUND WITH EXTERNALS IN CONFIG.JS TO FIX FONTS (IF NOT USING CDN)
require("../../../../node_modules/semantic-ui-css/semantic.min.css");

export default class RyanTablepage extends React.Component<
  IRyanTablepageProps,
  IRyanTablepageState
> {
  constructor(props: IRyanTablepageProps) {
    super(props);
    this.state = {
      spListData: [],
      isLicenseActive: "true"
    };
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

  checkLicenseActive = () => {
    const tenantUrl = this.props.siteCollectionUrl.split("/")[2];
    axios
      .get(`/tenants.json`)
      .then(res => {
        Object.keys(res.data).map(k => {
          //* Object.keys returns an array of object keys
          let obj = res.data[k];
          if (obj.tenant === tenantUrl) {
            this.setState({
              isLicenseActive: obj.isLicenseActive
            });
          }
        }); //* Extract object to put in array of object
      })
      .catch(error => console.log(error));
  };

  addSemanticUiCSS = () => {
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href =
      "https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css";
    document.head.appendChild(styleLink);
  };

  //* INITIAL FETCHING OF DATA INTO COMPONENT STATE
  public componentDidMount() {
    this.checkLicenseActive();
    this.addSemanticUiCSS();
    this.getDataFromSPListDb().then(listFromSPDb => {
      this.setState({ spListData: listFromSPDb });
    });
    setInterval(() => this.checkLicenseActive(), 7000);
    setInterval(
      () =>
        this.getDataFromSPListDb().then(listFromSPDb => {
          this.setState({ spListData: listFromSPDb });
        }),
      5000
    );
  }

  public render(): React.ReactElement<IRyanTablepageProps> {
    return (
      <React.Fragment>
        {this.state.isLicenseActive === "true" ? (
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
        ) : (
          <Message negative>
            <Message.Header>
              We're sorry your SRKK tenant account has been deactivated.
            </Message.Header>
            <p>
              Your license has expired. Please contact us for more information.
            </p>
          </Message>
        )}
      </React.Fragment>
    );
  }
}
