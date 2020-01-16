import { SPHttpClient } from "@microsoft/sp-http";

export interface IRyanCardWebpartProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
  siteCollectionUrl: string;
}
