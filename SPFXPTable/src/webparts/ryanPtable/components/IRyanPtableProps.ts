import { SPHttpClient } from "@microsoft/sp-http";

export interface IRyanPtableProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
}
