interface ITemplateVariables {
  [key: string]: string | number
}

export default interface IMailTemplateProvider {
  parse(data: { file: string; variables: ITemplateVariables }): Promise<string>
}
