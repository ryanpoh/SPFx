import * as React from "react";
import { IRyanLinechartProps } from "./IRyanLinechartProps";
import { IRyanLinechartState } from "./IRyanLinechartState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import { ISchema } from "../ISchema";
import LineChart from "./LineChart";

export default class RyanLinechart extends React.Component<
  IRyanLinechartProps,
  IRyanLinechartState
> {
  constructor(props: IRyanLinechartProps) {
    super(props);
    this.state = { spListData: [] };
  }

  //? METHOD: FETCHING DATA FROM SHAREPOINT LIST VIA REST API.
  private getDataFromSPListDb(): Promise<ISchema[]> {
    return new Promise<ISchema[]>((resolve, reject) => {
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('LinechartList')/items?$select=Id,Title,chartData,faultData`;
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
              chartData: jsonResponse.value[index].chartData,
              faultData: jsonResponse.value[index].faultData
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

  public render(): React.ReactElement<IRyanLinechartProps> {
    return (
      <div>
        <LineChart data={this.state.spListData} />
      </div>
    );
  }
}
