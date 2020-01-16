import * as React from "react";
import { IRyanCardWebpartProps } from "./IRyanCardWebpartProps";
import { IRyanCardWebpartState } from "./IRyanCardWebpartState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISchema } from "../ISchema";
import HeadlineCard from "./HeadlineCard";
import { Grid, GridColumn, Message } from "semantic-ui-react";
import axios from "../axios-license";

//TODO ENABLE STYLING. PLAY AROUND WITH EXTERNALS IN CONFIG.JS TO FIX FONTS (IF NOT USING CDN)
require("../../../../node_modules/semantic-ui-css/semantic.min.css");

export default class TestReact162 extends React.Component<
  IRyanCardWebpartProps,
  IRyanCardWebpartState
> {
  constructor(props: IRyanCardWebpartProps) {
    super(props);
    this.state = {
      spListData: [],
      isLicenseActive: "true"
    };
  }

  //? METHOD: FETCHING DATA FROM SHAREPOINT LIST VIA REST API.
  private getDataFromSPListDb(): Promise<ISchema[]> {
    return new Promise<ISchema[]>((resolve, reject) => {
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('HeadlineList')/items?$select=Id,Title,image,description,meta,status,icon`;
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
              header: jsonResponse.value[index].Title,
              image: jsonResponse.value[index].image,
              description: jsonResponse.value[index].description,
              meta: jsonResponse.value[index].meta,
              extra: jsonResponse.value[index].status,
              icon: jsonResponse.value[index].icon
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

  public render(): React.ReactElement<IRyanCardWebpartProps> {
    return (
      <React.Fragment>
        {this.state.isLicenseActive === "true" ? (
          <React.Fragment>
            <h2>Today</h2>
            <Grid columns={5}>
              {this.state.spListData.map(data => (
                <GridColumn key={data.id} stretched>
                  <HeadlineCard
                    header={data.header}
                    image={data.image}
                    description={data.description}
                    meta={data.meta}
                    extra={data.extra}
                    icon={data.icon}
                  />
                </GridColumn>
              ))}
            </Grid>
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
