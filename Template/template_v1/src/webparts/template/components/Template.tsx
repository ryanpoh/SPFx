import * as React from "react";
import { ITemplateProps } from "./ITemplateProps";
import { ITemplateState } from "./ITemplateState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISchema } from "../ISchema";
import MessageList from "./MessageList";
import axios from "../axios-license";
import { Message, Header, Divider } from "semantic-ui-react";

export default class RyanPTable extends React.Component<
  ITemplateProps,
  ITemplateState
> {
  constructor(props: ITemplateProps) {
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

  //* CHECKING LICENSE
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

  //* ADDING SEMANTIC UI CSS
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

  public render(): React.ReactElement<ITemplateProps> {
    const demoData = [{ item: "List 1" }, { item: "List 2" }];
    return (
      <React.Fragment>
        {this.state.isLicenseActive === "true" ? (
          <React.Fragment>
            <Header size="huge">Hello Template</Header>
            <Divider />
            <MessageList data={demoData} />
          </React.Fragment>
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
