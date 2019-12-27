import * as React from 'react';
import styles from './React16.module.scss';
import { IReact16Props } from './IReact16Props';
import { escape } from '@microsoft/sp-lodash-subset';

export default class React16 extends React.Component<IReact16Props, {}> {
  public render(): React.ReactElement<IReact16Props> {
    return (
      <div className={ styles.react16 }>
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
