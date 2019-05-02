
module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'bakery',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost'
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  },
  mail: {
    host: process.env.MAIL_HOST || 'smtp.gmail.com',
    secure: true,
    port: process.env.MAIL_PORT || 465,
    auth: {
      user: process.env.MAIL_USER || 'foomail48@gmail.com',
      pass: process.env.MAIL_PASS || '9zuhoP3V6C'
    }
  },
  notification: {
    mail: process.env.NOTIFICATION_MAIL || 'foomail48@gmail.com'
  }
}
