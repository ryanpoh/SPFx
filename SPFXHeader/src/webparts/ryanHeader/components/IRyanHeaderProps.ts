import { SPHttpClient } from "@microsoft/sp-http";

export interface IRyanHeaderProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
  siteCollectionUrl: string;
}
