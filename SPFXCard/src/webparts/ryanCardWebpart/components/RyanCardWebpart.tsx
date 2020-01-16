import * as React from "react";
import { IRyanCardWebpartProps } from "./IRyanCardWebpartProps";
import { IRyanCardWebpartState } from "./IRyanCardWebpartState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ISchema } from "../ISchema";
import HeadlineCard from "./HeadlineCard";
import { Grid, GridColumn, Message, Header, Divider } from "semantic-ui-react";

//TODO ENABLE STYLING. PLAY AROUND WITH EXTERNALS IN CONFIG.JS TO FIX FONTS (IF NOT USING CDN)
require("../../../../node_modules/semantic-ui-css/semantic.min.css");

export default class TestReact162 extends React.Component<
  IRyanCardWebpartProps,
  IRyanCardWebpartState
> {
  constructor(props: IRyanCardWebpartProps) {
    super(props);
    this.state = { spListData: [] };
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

  public render(): React.ReactElement<IRyanCardWebpartProps> {
    return (
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
    );
  }
}
