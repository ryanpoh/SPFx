import { SPHttpClient } from "@microsoft/sp-http";

export interface ITemplateProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
  siteCollectionUrl: string;
}
