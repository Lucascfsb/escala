interface ITemplateVariables {
  [key: string]: string | number
}

interface IParseMailTemplateDTO {
  file: string
  variables: ITemplateVariables
}

export default interface ISendMailDTO {
  to: string
  from?: {
    name: string
    email: string
  }
  subject: string
  templateData: IParseMailTemplateDTO
}
