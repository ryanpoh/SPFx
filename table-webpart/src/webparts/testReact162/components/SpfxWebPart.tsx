import * as React from "react";
import { ISpfxWebPartProps } from "./ISpfxWebPartProps";
import { ISpfxWebPartState } from "./ISpfxWebPartState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import { ISchema } from "../ISchema";
import HeadlineCard from "./HeadlineCard";

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
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('reactList')/items?$select=Id,Title`;
      this.props.spHttpClient
        .get(endpoint, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((jsonResponse: any) => {
          let listFromSPDb: ISchema[] = [];
          for (let index = 0; index < jsonResponse.value.length; index++) {
            listFromSPDb.push({
              id: jsonResponse.value[index].Id,
              header: jsonResponse.value[index].Title,
              // image: jsonResponse.value[index].image,
              // description: jsonResponse.value[index].description,
              // meta: jsonResponse.value[index].meta,
              // extra: jsonResponse.value[index].extra
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
        <h2>Today</h2>
        {/* <PieChart data={this.state.spListData} /> */}
        {this.state.spListData.map((data) => (
          <HeadlineCard key={data.id} header={data.header} />
        ))}
      </div>
    );
  }
}
