import { SPHttpClient } from "@microsoft/sp-http";

export interface IRyanLinechartProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
  siteCollectionUrl: string;
}
