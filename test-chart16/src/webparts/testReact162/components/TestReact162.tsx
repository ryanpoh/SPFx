import * as React from "react";
import styles from "./TestReact162.module.scss";
import { ITestReact162Props } from "./ITestReact162Props";
import { escape } from "@microsoft/sp-lodash-subset";

import { ITestReact162State } from "./ITestReact162State";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import { IColor } from "../IColor";
import { ColorList, IColorListProps } from "./ColorList";
import PieChart from "./PieChart";

export default class TestReact162 extends React.Component<
  ITestReact162Props, //Props
  ITestReact162State //State
> {
  private _colors: IColor[] = [
    { id: 1, title: "red", chartData: 20 },
    { id: 2, title: "blue", chartData: 20 },
    { id: 3, title: "green", chartData: 20 }
  ];

  constructor(props: ITestReact162Props) {
    super(props);
    this.state = { colors: [] };
  }

  private getColorsFromSpList(): Promise<IColor[]> {
    return new Promise<IColor[]>((resolve, reject) => {
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('reactList')/items?$select=Id,Title,chartData`;
      this.props.spHttpClient
        .get(endpoint, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json();
        })
        .then((jsonResponse: any) => {
          let spListItemColors: IColor[] = [];
          for (let index = 0; index < jsonResponse.value.length; index++) {
            spListItemColors.push({
              id: jsonResponse.value[index].Id,
              title: jsonResponse.value[index].Title,
              chartData: jsonResponse.value[index].chartData
            });

            resolve(spListItemColors);
          }
        });
    });
  }

  public componentDidMount(): void {
    this.getColorsFromSpList().then(spListItemColors => {
      this.setState({ colors: spListItemColors });
    });
  }

  public render(): React.ReactElement<ITestReact162Props> {
    return (
      <div>
        <PieChart data={this.state.colors} />
      </div>
    );
  }
  private _removeColor = (colorToRemove: IColor): void => {
    const newColors = this.state.colors.filter(color => color != colorToRemove);
    this.setState({ colors: newColors });
  };
}
