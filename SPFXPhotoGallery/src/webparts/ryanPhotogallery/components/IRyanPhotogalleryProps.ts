import { SPHttpClient } from "@microsoft/sp-http";

export interface IRyanPhotogalleryProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
  siteCollectionUrl: string;
}
