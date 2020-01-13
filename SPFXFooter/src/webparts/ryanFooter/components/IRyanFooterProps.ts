import { SPHttpClient } from "@microsoft/sp-http";

export interface IRyanFooterProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
  siteCollectionUrl: string;
}
