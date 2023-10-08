import { Router } from "express";

import productController from "../../controllers/productController";
const routes = Router();

routes.get("/productList", productController.getAll);
routes.get("/product/name/:name", productController.getByName);
routes.get("/product/:id", productController.getById);
routes.post("/product", productController.add);
routes.patch("/product/:id", productController.updateById);
routes.delete("/product/:productId", productController.destroyById);

export default routes;
