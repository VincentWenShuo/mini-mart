import db from "../db";
const Product = db.Product;
console.log("Product", Product);
import { NotFound } from "../helpers";
import redisClient from "../redis"

//todo::add limit for this
export const getAll = async (req, res) => {
    console.log("getAll1", req?.body);
    const cacheData = await redisClient.get("product:all");
    if( cacheData ){
        return res.status(200).json(JSON.parse(cacheData));
    }
    else{
        const product = await Product.findAll();
        redisClient.set("product:all", JSON.stringify(product));
        return res.status(200).json(product);
    }
};

const updateProductsAllCache = async () => {
    const product = await Product.findAll();
    return redisClient.set("product:all", JSON.stringify(product));
};

export const getByName = async (req, res) => {
    const { name } = req.params;

    const product = await Product.findOne({ where: { name: name } });
    if (!product) throw new NotFound("Product not found by name " + name);

    return res.status(200).json(product);
};

export const getById = async (req, res) => {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id: id } });
    if (!product) throw new NotFound("Product not found by id " + id);

    return res.status(200).json(product);
};

export const add = async (req, res) => {
    const { name, description, image, price } = req.body;

    const newProduct = await Product.create({
        name: name,
        description: description,
        image: image,
        price: price
    });
    updateProductsAllCache();
    return res.status(201).json(newProduct);
};

export const updateById = async (req, res) => {
    const { id } = req.params;
    const { name, description, image, price } = req.body;

    console.log("updateById", req.params, req.body);

    const product = await Product.findOne({ where: { id: id } });
    if (!product) throw new NotFound("Product not found by Id " + id);
    await Product.update(
        {
            name: name,
            description: description,
            image: image,
            price: price
        },
        { where: { id: product.id } }
    );
    updateProductsAllCache();
    return res.status(204).end();
};

export const destroyById = async (req, res) => {
    const { productId } = req.params;

    const product = await Product.findOne({ where: { id: productId } });
    if (!product) throw new NotFound("Product not found.");
    await Product.destroy({ where: { id: product.id } });
    updateProductsAllCache();
    return res.status(204).end();
};

export default {
    getAll,
    getByName,
    getById,
    add,
    updateById,
    destroyById,
};
