import * as React from "react";
import { IRyanTabwindowsProps } from "./IRyanTabwindowsProps";
import { IRyanTabwindowsState } from "./IRyanTabwindowsState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISchema } from "../ISchema";
import TabWindows from "./TabWindows";
import axios from "../axios-license";
import { Message } from "semantic-ui-react";

require("../../../../node_modules/semantic-ui-css/semantic.min.css");

export default class RyanPTable extends React.Component<
  IRyanTabwindowsProps,
  IRyanTabwindowsState
> {
  constructor(props: IRyanTabwindowsProps) {
    super(props);
    this.state = {
      spListData: [],
      isLicenseActive: "true"
    };
  }

  //? METHOD: FETCHING DATA FROM SHAREPOINT LIST VIA REST API.
  private getDataFromSPListDb(): Promise<ISchema[]> {
    return new Promise<ISchema[]>((resolve, reject) => {
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('TabWindowsList')/items?$select=Id,Title,image,meta,tag,labelIcon,labelContent,buttonIcon,buttonContent,pane,paragraph`;
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
              image: jsonResponse.value[index].image,
              meta: jsonResponse.value[index].meta,
              tag: jsonResponse.value[index].tag,
              labelIcon: jsonResponse.value[index].labelIcon,
              labelContent: jsonResponse.value[index].labelContent,
              buttonIcon: jsonResponse.value[index].buttonIcon,
              buttonContent: jsonResponse.value[index].buttonContent,
              pane: jsonResponse.value[index].pane,
              paragraph: jsonResponse.value[index].paragraph
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
              isLicenseActive: obj.isLicenseActive
            });
          }
        }); //? Extract object to put in array of object
      })
      .catch(error => console.log(error));
  };

  //? INITIAL FETCHING OF DATA INTO COMPONENT STATE
  public componentDidMount() {
    this.checkLicenseActive();
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

  public render(): React.ReactElement<IRyanTabwindowsProps> {
    return (
      <React.Fragment>
        {this.state.isLicenseActive === "true" ? (
          <TabWindows data={this.state.spListData} />
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
