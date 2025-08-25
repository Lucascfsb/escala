interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IMailTemplateProvider {
  parse(data: { file: string; variables: ITemplateVariables }): Promise<string>;
}
