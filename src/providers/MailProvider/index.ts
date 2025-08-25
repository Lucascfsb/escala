import { EtherealMailProvider } from "../MailTemplateProvider/implementations/EtherealMailProvider";
import { mailConfig } from "../../config/mail";
import { IMailProvider } from "./models/IMailProvider";

export const mailProviderPromise: Promise<IMailProvider> = (async () => {
  if (mailConfig.driver === "ethereal") {
    const provider = new EtherealMailProvider();

    return provider;
  }
  // else if (mailConfig.driver === 'ses') {
  //   return new SESMailProvider();
  // }
  throw new Error("Mail provider not configured");
})();
