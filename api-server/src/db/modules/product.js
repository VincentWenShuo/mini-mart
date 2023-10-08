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
                    // notEmpty: { msg: "Please enter the password" },
                    // len: {
                    //     args: [6, 20],
                    //     msg: "password must contain at least 6 characters  and a maximum of 50",
                    // },
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
