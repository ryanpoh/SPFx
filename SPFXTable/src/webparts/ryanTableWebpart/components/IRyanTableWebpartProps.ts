import { SPHttpClient } from "@microsoft/sp-http";

export interface IRyanTableWebpartProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
  siteCollectionUrl: string;
}

