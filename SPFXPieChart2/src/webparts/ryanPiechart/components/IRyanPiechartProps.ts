import { SPHttpClient } from "@microsoft/sp-http";

export interface IRyanPiechartProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
  siteCollectionUrl: string;
}
