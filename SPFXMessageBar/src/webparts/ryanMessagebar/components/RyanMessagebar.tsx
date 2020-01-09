import * as React from "react";
import { IRyanMessagebarProps } from "./IRyanMessagebarProps";
import { IRyanMessagebarState } from "./IRyanMessagebarState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISchema } from "../ISchema";
import MessageCarousel from "./MessageCarousel";
import axios from "../axios-license";
import { Message } from "semantic-ui-react";

require("../../../../node_modules/semantic-ui-css/semantic.min.css");

export default class RyanMessagebar extends React.Component<
  IRyanMessagebarProps,
  IRyanMessagebarState
> {
  constructor(props: IRyanMessagebarProps) {
    super(props);
    this.state = {
      spListData: [],
      isLicenseActive: true
    };
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

  deactivateLicenseHandler = () => {
    const tenantUrl = this.props.siteCollectionUrl.split("/")[2];
    const getObject = theObject => {
      var result = null;
      if (theObject instanceof Array) {
        for (var i = 0; i < theObject.length; i++) {
          result = getObject(theObject[i]);
          if (result) {
            break;
          }
        }
      } else {
        for (var prop in theObject) {
          prop + ": " + theObject[prop];
          if (prop == "tenant") {
            if (theObject[prop] == tenantUrl) {
              return theObject;
            }
          }
          if (
            theObject[prop] instanceof Object ||
            theObject[prop] instanceof Array
          ) {
            result = getObject(theObject[prop]);
            if (result) {
              break;
            }
          }
        }
      }

      return result;
    };

    axios
      .get(`/tenants.json`)
      .then(res => {
        this.setState({ isLicenseActive: false });
        console.log("License deactivated!");
        let key = Object.keys(res.data)[0];
        return axios.patch(`/tenants/${key}.json`, {
          //? Add ...res.data[key] for PUT request
          isLicenseActive: false
        });
      })
      .then(response => {
        console.log("Response", response);
      });
  };

  addNewTenant = () => {
    const tenantUrl = this.props.siteCollectionUrl.split("/")[2]; //? Extract the base URL to get tenant

    const newTenant = {
      tenant: tenantUrl,
      isLicenseActive: true,
      date: new Date()
    };

    axios
      .post(`/tenants.json`, newTenant)
      .then(res => {
        //? Adding parent key as a child property.
        return axios.patch(`/tenants/${res.data.name}.json`, {
          key: res.data.name
        });
      })
      .then(response => {
        console.log("Response", response);
      });
  };

  checkLicenseActive = () => {
    const tenantUrl = this.props.siteCollectionUrl.split("/")[2];
    const getObject = theObject => {
      var result = null;
      if (theObject instanceof Array) {
        for (var i = 0; i < theObject.length; i++) {
          result = getObject(theObject[i]);
          if (result) {
            break;
          }
        }
      } else {
        for (var prop in theObject) {
          prop + ": " + theObject[prop];
          if (prop == "tenant") {
            if (theObject[prop] == tenantUrl) {
              return theObject;
            }
          }
          if (
            theObject[prop] instanceof Object ||
            theObject[prop] instanceof Array
          ) {
            result = getObject(theObject[prop]);
            if (result) {
              break;
            }
          }
        }
      }

      return result;
    };
    axios
      .get(`/tenants.json`)
      .then(res => {
        let targetObj = getObject(res.data);
        if (targetObj.isLicenseActive === true) {
          console.log("License is active!");
          this.setState({ isLicenseActive: true });
        } else {
          console.log("License has expired.");
          this.setState({ isLicenseActive: false });
        }
      })
      .catch(error => console.log(error));
  };

  generateDemoData = () => {
    //? ONLY FOR GENERATING DEMO DATA FOR PS1 FILES
    this.state.spListData.map(data =>
      console.log(
        `Add-PnPListItem -List "MessagebarList" -Values @{
            "Title" =  "${data.title}"; 
            "desc"=" ${data.desc}";
            "icon"=" ${data.icon}";
          }`
      )
    );
  };

  public componentDidMount() {
    //? INITIAL FETCHING OF DATA INTO COMPONENT STATE
    this.addNewTenant();
    // this.checkLicenseActive();
    this.getDataFromSPListDb().then(listFromSPDb => {
      this.setState({ spListData: listFromSPDb });
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
        {this.state.isLicenseActive ? (
          <MessageCarousel data={this.state.spListData} />
        ) : (
          <Message negative>
            <Message.Header>
              We're sorry your SRKK account has been deactivated.
            </Message.Header>
            <p>Your license has expired.</p>
          </Message>
        )}
      </React.Fragment>
    );
  }
}
