import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "RyanMessagebarWebPartStrings";
import RyanMessagebar from "./components/RyanMessagebar";
import { IRyanMessagebarProps } from "./components/IRyanMessagebarProps";

export interface IRyanMessagebarWebPartProps {
  description: string;
}

export default class RyanMessagebarWebPart extends BaseClientSideWebPart<
  //? <TestReact162>. For some reason, name of file can't change. otherwise warning.
  IRyanMessagebarWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<IRyanMessagebarProps> = React.createElement(
      RyanMessagebar, // ?why is it still named as TestReact162 in dev tools
      {
        description: this.properties.description,
        spHttpClient: this.context.spHttpClient,
        currentSiteUrl: this.context.pageContext.web.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
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
                PropertyPaneTextField("description", {
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
