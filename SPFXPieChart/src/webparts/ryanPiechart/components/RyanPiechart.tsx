import * as React from "react";
import { IRyanPiechartProps } from "./IRyanPiechartProps";
import { IRyanPiechartState } from "./IRyanPiechartState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import { ISchema } from "../ISchema";
import PieChart from "./PieChart";

export default class RyanPiechart extends React.Component<
  IRyanPiechartProps,
  IRyanPiechartState
> {
  constructor(props: IRyanPiechartProps) {
    super(props);
    this.state = { spListData: [] };
  }

  //? METHOD: FETCHING DATA FROM SHAREPOINT LIST VIA REST API.
  private getDataFromSPListDb(): Promise<ISchema[]> {
    return new Promise<ISchema[]>((resolve, reject) => {
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('PiechartList')/items?$select=Id,Title,chartData`;
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
              title: jsonResponse.value[index].Title,
              chartData: jsonResponse.value[index].chartData
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

  public render(): React.ReactElement<IRyanPiechartProps> {
    return (
      <div>
        <PieChart data={this.state.spListData} />
      </div>
    );
  }
}
