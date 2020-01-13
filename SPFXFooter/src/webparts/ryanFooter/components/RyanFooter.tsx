import * as React from "react";
import { IRyanFooterProps } from "./IRyanFooterProps";
import { IRyanFooterState } from "./IRyanFooterState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISchema } from "../ISchema";
import Footer from "./Footer";
import axios from "../axios-license";
import { Message } from "semantic-ui-react";

require("../../../../node_modules/semantic-ui-css/semantic.min.css");

export default class RyanPTable extends React.Component<
  IRyanFooterProps,
  IRyanFooterState
> {
  constructor(props: IRyanFooterProps) {
    super(props);
    this.state = {
      spListData: [],
      isLicenseActive: "true"
    };
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
        this.setState({
          isLicenseActive: targetObj.isLicenseActive
        });
      })
      .catch(error => console.log(error));
  };

  //? INITIAL FETCHING OF DATA INTO COMPONENT STATE
  public componentDidMount() {
    this.checkLicenseActive();
    // this.getDataFromSPListDb().then(listFromSPDb => {
    //   this.setState({ spListData: listFromSPDb });
    // });
  }

  //? DYNAMIC UPDATING OF DATA INTO COMPONENT STATE EVERY 5 SECONDS
  public componentWillMount() {
    setInterval(() => this.checkLicenseActive(), 7000);
    // setInterval(
    //   () =>
    //     this.getDataFromSPListDb().then(listFromSPDb => {
    //       this.setState({ spListData: listFromSPDb });
    //     }),
    //   5000
    // );
  }

  public render(): React.ReactElement<IRyanFooterProps> {
    return (
      <React.Fragment>
        {this.state.isLicenseActive === "true" ? (
          <Footer />
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
