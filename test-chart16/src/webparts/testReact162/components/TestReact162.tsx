import * as React from "react";
import styles from "./TestReact162.module.scss";
import { ITestReact162Props } from "./ITestReact162Props";
import { escape } from "@microsoft/sp-lodash-subset";

import { ITestReact162State } from "./ITestReact162State";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import { IColor } from "../IColor";
import { ColorList, IColorListProps } from "./ColorList";

export default class TestReact162 extends React.Component<
  ITestReact162Props, //Props
  ITestReact162State //State
> {
  private _colors: IColor[] = [
    { id: 1, title: "red" },
    { id: 2, title: "blue" },
    { id: 3, title: "green" }
  ];

  constructor(props: ITestReact162Props) {
    super(props);
    this.state = { colors: [] };
  }

  private getColorsFromSpList(): Promise<IColor[]> {
    return new Promise<IColor[]>((resolve, reject) => {
      const endpoint: string = `${this.props.currentSiteUrl}/_api/lists/getbytitle('reactList')/items?$select=Id,Title`;
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
              title: jsonResponse.value[index].Title
            });

            resolve(spListItemColors);
          }
        });
    });
  }

  public componentDidMount(): void {
    this.getColorsFromSpList().then((spListItemColors: IColor[]) => {
      this.setState({ colors: spListItemColors });
    });
  }

  public render(): React.ReactElement<ITestReact162Props> {
    return (
      <div className={styles.testReact162}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>
                Welcome to SharePoint + React16 !
              </span>
              <ColorList
                colors={this.state.colors}
                onRemoveColor={this._removeColor}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  private _removeColor = (colorToRemove: IColor): void => {
    const newColors = this.state.colors.filter(color => color != colorToRemove);
    this.setState({ colors: newColors });
  };
}
