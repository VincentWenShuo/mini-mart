import fs from "fs";
import dotenv from "dotenv";
import path from "path";
import Sequelize from "sequelize";
const basename = __dirname + "/modules";
const db = {};

dotenv.config();
const config = {
    username: process.env.MYSQL_USERNAME || "",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "",
    host: process.env.MYSQL_HOST || "",
    port: process.env.MYSQL_PORT || "",
    dialect: "mysql"
};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(basename)
    .forEach(file => {
        const model = require(path.join(basename, file)).default(
            sequelize,
            Sequelize.DataTypes
        );
        console.log("model.name", model.name);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        console.log("modelName", modelName);
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;