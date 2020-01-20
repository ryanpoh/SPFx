import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "RyanPiechartWebPartStrings";
import RyanPiechart from "./components/RyanPiechart";
import { IRyanPiechartProps } from "./components/IRyanPiechartProps";

export interface IRyanPiechartWebPartProps {
  description: string;
}

// !Renders the TestReact162.tsx file. React.createElement is like <TestReact162 description: this.props.description />
export default class RootWebPart extends BaseClientSideWebPart<
  //? <TestReact162>. For some reason, name of file can't change. otherwise warning.
  IRyanPiechartWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<IRyanPiechartProps> = React.createElement(
      RyanPiechart, // ?why is it still named as TestReact162 in dev tools
      {
        description: this.properties.description,
        spHttpClient: this.context.spHttpClient,
        currentSiteUrl: this.context.pageContext.web.absoluteUrl,
        siteCollectionUrl: this.context.pageContext.site.absoluteUrl
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
