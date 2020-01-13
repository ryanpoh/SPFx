import { SPHttpClient } from "@microsoft/sp-http";

export interface IRyanTabwindowsProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
  siteCollectionUrl: string;
}
