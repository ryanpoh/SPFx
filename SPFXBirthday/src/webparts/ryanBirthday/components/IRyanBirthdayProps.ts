import { SPHttpClient } from "@microsoft/sp-http";

export interface IRyanBirthdayProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
  siteCollectionUrl: string;
}
