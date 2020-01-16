import { SPHttpClient } from "@microsoft/sp-http";

export interface IRyanTablepageProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
  siteCollectionUrl: string;
}
