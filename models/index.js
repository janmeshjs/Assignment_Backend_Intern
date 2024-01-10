// Here is a reference snippet of code from /identify.js:
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV;

// Load the Sequelize configuration from config.json
const config = require(__dirname + '/../config/config.json')[env];
// Initialize an empty object to hold the database models
const db = {};

let sequelize;

// Check if a database connection URI is specified in the environment variable
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all files in the current directory, except for the current file and test files
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
        // For each model file, import the model and associate it with the Sequelize instance
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

  // Associate all models
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Attach the Sequelize instance and Sequelize constructor to the db object
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
