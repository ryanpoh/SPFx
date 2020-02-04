import * as React from "react";
import { IRyanHeaderProps } from "./IRyanHeaderProps";
import { IRyanHeaderState } from "./IRyanHeaderState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISchema } from "../ISchema";
import HeaderList from "./HeaderList";
import axios from "../axios-license";
import { Message, Header, Divider, Button, Icon } from "semantic-ui-react";

//TODO ENABLE STYLING. PLAY AROUND WITH EXTERNALS IN CONFIG.JS TO FIX FONTS (IF NOT USING CDN)
require("../../../../node_modules/semantic-ui-css/semantic.min.css");

export default class RyanPTable extends React.Component<
  IRyanHeaderProps,
  IRyanHeaderState
> {
  constructor(props: IRyanHeaderProps) {
    super(props);
    this.state = {
      spListData: [],
      isLicenseActive: "true"
    };
  }

  //* METHOD: FETCHING DATA FROM SHAREPOINT LIST VIA REST API.
  private getDataFromSPListDb(): Promise<ISchema[]> {
    return new Promise<ISchema[]>((resolve, reject) => {
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('HeaderList')/items?$select=Id,Title,desc,items`;
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
              title: jsonResponse.value[index].Title,
              desc: jsonResponse.value[index].desc,
              items: jsonResponse.value[index].items
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
          //? Object.keys returns an array of object keys
          let obj = res.data[k];
          if (obj.tenant === tenantUrl) {
            this.setState({
              isLicenseActive: res.data[obj.key].isLicenseActive //? This is pretty pointless, might as well use the bottom. It's more prepare for the future if using seperate database for key auth.
              // isLicenseActive: obj.isLicenseActive
            });
          }
        }); //? Extract object to put in array of object
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

  public render(): React.ReactElement<IRyanHeaderProps> {
    return (
      <React.Fragment>
        {console.log(this.state.spListData)}
        {this.state.isLicenseActive === "true" ? (
          <React.Fragment>
            <Header size="huge">
              {this.state.spListData[0]
                ? this.state.spListData[0].title
                : "No Title"}
            </Header>
            <Divider />
            <Message color="teal">
              <Message.Header>
                {this.state.spListData[0]
                  ? this.state.spListData[0].desc
                  : "No Description"}
              </Message.Header>
              <HeaderList data={this.state.spListData} />
            </Message>
          </React.Fragment>
        ) : (
          <Message negative>
            <Message.Header>
              We're sorry your SRKK tenant account has been deactivated. Test
              with key.
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
