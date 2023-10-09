"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {}
    }
    Product.init(
        {
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "Please enter the name" },
                },
            },
            description: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: { msg: "Please enter the description" },
                },
            },
            image: {
                type: DataTypes.STRING,
                validate: {
                },
            },
            price: {
                type: DataTypes.FLOAT,
                validate: {
                    notEmpty: { msg: "Please enter the price" },
                },
            },
        },
        {
            sequelize,
            modelName: "Product",
            freezeTableName: true ,
            timestamps: false
        }
    );
    return Product;
};
