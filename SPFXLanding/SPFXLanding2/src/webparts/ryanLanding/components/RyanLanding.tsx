import * as React from "react";
import styles from "./RyanLanding.module.scss";
import { IRyanLandingProps } from "./IRyanLandingProps";
import LandingPage from "./LandingPage";

export default class RyanLanding extends React.Component<
  IRyanLandingProps,
  {}
> {
  public render(): React.ReactElement<IRyanLandingProps> {
    return (
      <div>
        <LandingPage />
      </div>
    );
  }
}
