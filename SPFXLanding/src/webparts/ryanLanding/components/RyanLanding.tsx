import * as React from 'react';
import styles from './RyanLanding.module.scss';
import { IRyanLandingProps } from './IRyanLandingProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class RyanLanding extends React.Component<IRyanLandingProps, {}> {
  public render(): React.ReactElement<IRyanLandingProps> {
    return (
      <div className={ styles.ryanLanding }>
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
