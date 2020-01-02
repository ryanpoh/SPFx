import * as React from "react";
import { ISpfxWebPartProps } from "./ISpfxWebPartProps";
import { ISpfxWebPartState } from "./ISpfxWebPartState";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import { ISchema } from "../ISchema";
import PieChart from "./PieChart";

export default class TestReact162 extends React.Component<
  ISpfxWebPartProps, //Props
  ISpfxWebPartState //State
> {
  constructor(props: ISpfxWebPartProps) {
    super(props);
    this.state = { spListData: [] };
  }

  private getDataFromSPListDb(): Promise<ISchema[]> {
    return new Promise<ISchema[]>((resolve, reject) => {
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('reactList')/items?$select=Id,Title,chartData`;
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

  public componentDidMount(): void {
    this.getDataFromSPListDb().then(listFromSPDb => {
      this.setState({ spListData: listFromSPDb });
    });
  }

  public render(): React.ReactElement<ISpfxWebPartProps> {
    return (
      <div>
        <PieChart data={this.state.spListData} />
      </div>
    );
  }
}
