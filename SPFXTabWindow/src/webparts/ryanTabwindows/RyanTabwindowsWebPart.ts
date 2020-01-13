import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'RyanTabwindowsWebPartStrings';
import RyanTabwindows from './components/RyanTabwindows';
import { IRyanTabwindowsProps } from './components/IRyanTabwindowsProps';

export interface IRyanTabwindowsWebPartProps {
  description: string;
}

export default class RyanTabwindowsWebPart extends BaseClientSideWebPart<IRyanTabwindowsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRyanTabwindowsProps > = React.createElement(
      RyanTabwindows,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
