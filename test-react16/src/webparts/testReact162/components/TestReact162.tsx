import * as React from "react";
import styles from "./TestReact162.module.scss";
import { ITestReact162Props } from "./ITestReact162Props";
import { escape } from "@microsoft/sp-lodash-subset";

import { IColor } from "../IColor";
import { ColorList, IColorListProps } from "./ColorList";

export default class TestReact162 extends React.Component<
  ITestReact162Props, //Props
  {} //State
> {
  private _colors: IColor[] = [
    { id: 1, title: "red" },
    { id: 2, title: "blue" },
    { id: 3, title: "green" }
  ];
  public render(): React.ReactElement<ITestReact162Props> {
    return (
      <div className={styles.testReact162}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>
                Welcome to SharePoint + React16 !
              </span>
              <ColorList colors={this._colors} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
