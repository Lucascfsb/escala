// src/providers/MailProvider/implementations/EtherealMailProvider.ts
import nodemailer, { Transporter } from 'nodemailer';
import mailConfig from '../../../config/mail';
import IMailProvider from '../../MailProvider/models/IMailProvider';
import ISendMailDTO from '../../MailProvider/dtos/ISendMailDTO';
import HandlebarsMailTemplateProvider from '../../MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

class EtherealMailProvider implements IMailProvider {
  private client: Transporter;
  private mailTemplateProvider: HandlebarsMailTemplateProvider;
  private initialized: Promise<void>; 

  constructor() {
    this.mailTemplateProvider = new HandlebarsMailTemplateProvider();
    this.initialized = this.initialize(); 
  }

  private async initialize(): Promise<void> {
    try {
      const account = await nodemailer.createTestAccount();
      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    } catch (err) {
      console.error('Failed to create Ethereal test account:', err);
      throw err; 
    }
  }

  public async sendMail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    await this.initialized; 

    const { email, name } = mailConfig.defaults.from;

    const message = await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to,
        address: to,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;