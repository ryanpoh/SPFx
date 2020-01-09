import * as React from "react";
import { IRyanMessagebarProps } from "./IRyanMessagebarProps";
import { IRyanMessagebarState } from "./IRyanMessagebarState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISchema } from "../ISchema";
import MessageCarousel from "./MessageCarousel";
import axios from "../axios-license";

require("../../../../node_modules/semantic-ui-css/semantic.min.css");

export default class RyanMessagebar extends React.Component<
  IRyanMessagebarProps,
  IRyanMessagebarState
> {
  constructor(props: IRyanMessagebarProps) {
    super(props);
    this.state = { spListData: [] };
  }

  //? METHOD: FETCHING DATA FROM SHAREPOINT LIST VIA REST API.
  private getDataFromSPListDb(): Promise<ISchema[]> {
    return new Promise<ISchema[]>((resolve, reject) => {
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('MessagebarList')/items?$select=Id,Title,desc,icon`;
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
              title: jsonResponse.value[index].Title,
              desc: jsonResponse.value[index].desc,
              icon: jsonResponse.value[index].icon
            });

            resolve(listFromSPDb);
          }
        });
    });
  }

  //? INITIAL FETCHING OF DATA INTO COMPONENT STATE
  public componentDidMount() {
    //? Registering New License with SRKK server
    const newSiteLicense = {
      client: 'test',
      currentSite: this.props.currentSiteUrl, //? Will change if it is at subsite
      siteCollection: this.props.siteCollectionUrl, //? Always constant
      tenant: this.props.siteCollectionUrl.split('/')[2], //? Extract the base URL to get tenant
      isLicenseActive: true,
      date: new Date()
    };
    axios
      .post("/siteLicenses.json", newSiteLicense)
      .then(response => console.log(response))
      .catch(error => console.log(error));

    this.getDataFromSPListDb().then(listFromSPDb => {
      this.setState({ spListData: listFromSPDb });

      //! ONLY FOR GENERATING DEMO DATA FOR PS1 FILES
      this.state.spListData.map(data =>
        console.log(
          `Add-PnPListItem -List "MessagebarList" -Values @{
            "Title" =  "${data.title}"; 
            "desc"=" ${data.desc}";
            "icon"=" ${data.icon}";
          }`
        )
      );
    });
  }

  //? DYNAMIC UPDATING OF DATA INTO COMPONENT STATE EVERY 5 SECONDS
  // public componentWillMount() {
  //   setInterval(
  //     () =>
  //       this.getDataFromSPListDb().then(listFromSPDb => {
  //         this.setState({ spListData: listFromSPDb });
  //       }),
  //     5000
  //   );
  // }

  public render(): React.ReactElement<IRyanMessagebarProps> {
    return (
      <React.Fragment>
        <MessageCarousel data={this.state.spListData} />
      </React.Fragment>
    );
  }
}
