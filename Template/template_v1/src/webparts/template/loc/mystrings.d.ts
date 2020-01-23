declare interface ITemplateWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'TemplateWebPartStrings' {
  const strings: ITemplateWebPartStrings;
  export = strings;
}
