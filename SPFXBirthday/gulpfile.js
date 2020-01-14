"use strict";

const gulp = require("gulp");
const build = require("@microsoft/sp-build-web");
build.addSuppression(
  `Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`
);

build.configureWebpack.mergeConfig({
  additionalConfiguration: generatedConfiguration => {
    generatedConfiguration.module.rules.push({
      test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
      use: {
        loader: "url-loader?limit=100000"
      }
    });
    return generatedConfiguration;
  }
});

build.initialize(gulp);
