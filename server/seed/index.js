
const fs = require('fs')
const path = require('path')
const models = require('../src/models')

models.sequelize.sync({ force: true })
  .then(() => {
    fs.readdirSync(__dirname)
      .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-5) === '.json'))
      .forEach((file) => {
        const modelName = file.slice(0, -5)
        const records = JSON.parse(fs.readFileSync(path.join(__dirname, file)))
        records.forEach((record) => {
          models[modelName].create(record)
        })
      })
  })
