
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')
const config = require('../config')

function readHTMLFile (path, callback) {
  fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
    if (err) {
      callback(err)
    } else {
      callback(null, html)
    }
  })
}

module.exports = {
  sendHTMLMail (toEmail, subject, templateFile, replacements) {
    readHTMLFile(`${__dirname}/pages/${templateFile}.html`, (err, html) => {
      if (!err) {
        const template = handlebars.compile(html)
        const htmlToSend = template(replacements)
        const mailOptions = {
          from: config.mail.auth.user,
          to: toEmail || config.notification.mail,
          subject: subject,
          html: htmlToSend
        }
        const transporter = nodemailer.createTransport(config.mail)
        transporter.sendMail(mailOptions, (error, response) => {
          if (error) {
            console.log(error)
          }
        })
      } else {
        console.log(err)
      }
    })
  },
  sendMail (toEmail, subject, text) {
    const mailOptions = {
      from: config.mail.auth.user,
      to: toEmail,
      subject: subject,
      text: text
    }
    const transporter = nodemailer.createTransport(config.mail)
    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error)
      }
    })
  }
}
