import fs from "node:fs";
import { resolve } from "node:path";
import handlebars from "handlebars";

import type { IMailTemplateProvider } from "../../MailProvider/models/IMailTemplateProvider";

interface ITemplateVariables {
  [key: string]: string | number;
}

export class HandlebarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: {
    file: string;
    variables: ITemplateVariables;
  }): Promise<string> {
    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "..",
      "views",
      "emails",
      file
    );

    const templateFileContent = await fs.promises.readFile(templatePath, {
      encoding: "utf-8",
    });

    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
