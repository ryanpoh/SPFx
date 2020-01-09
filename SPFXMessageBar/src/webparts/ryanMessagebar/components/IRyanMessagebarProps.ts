import { SPHttpClient } from "@microsoft/sp-http";

export interface IRyanMessagebarProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
}
