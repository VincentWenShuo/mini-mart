import Router from "express";

import productRoutes from "./productRoutes";
import imageRoutes from "./imageRoutes";

const routes = new Router();

routes.use(productRoutes);
routes.use(imageRoutes);

export default routes;