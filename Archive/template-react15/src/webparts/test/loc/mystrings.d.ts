declare interface ITestWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'TestWebPartStrings' {
  const strings: ITestWebPartStrings;
  export = strings;
}
