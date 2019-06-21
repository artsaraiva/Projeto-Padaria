
module.exports = {
  development: {
    username: 'root_user',
    password: 'root',
    database: 'bakery',
    host: '127.0.0.1',
    dialect: 'mysql',
    seederStorage: 'sequelize'
  },
  test: {
    username: process.env.DB_USERNAME || 'root_user',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'bakery',
    host: process.env.DB_HOSTNAME || '127.0.0.1',
    dialect: 'mysql',
    seederStorage: 'sequelize'
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    seederStorage: 'sequelize'
  },
  port: process.env.PORT || 8081,
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
