interface IMailConfig {
  driver: 'ethereal' | 'ses'
  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: process.env.MAIL_FROM_EMAIL || 'noreply@yourdomain.com',
      name: process.env.MAIL_FROM_NAME || 'Equipe YourApp',
    },
  },
} as IMailConfig
