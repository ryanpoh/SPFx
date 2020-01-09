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
  //? Great documentation: https://docs.microsoft.com/en-us/javascript/api/sp-page-context/pagecontext?view=sp-typescript-latest#user
  IRyanMessagebarWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<IRyanMessagebarProps> = React.createElement(
      RyanMessagebar,
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
