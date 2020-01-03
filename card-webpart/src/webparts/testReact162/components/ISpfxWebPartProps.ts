import { SPHttpClient } from "@microsoft/sp-http";

export interface ISpfxWebPartProps {
  description: string;
  spHttpClient: SPHttpClient;
  currentSiteUrl: string;
}
