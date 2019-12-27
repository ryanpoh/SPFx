import * as React from 'react';
import styles from './TestReact162.module.scss';
import { ITestReact162Props } from './ITestReact162Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class TestReact162 extends React.Component<ITestReact162Props, {}> {
  public render(): React.ReactElement<ITestReact162Props> {
    return (
      <div className={ styles.testReact162 }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
