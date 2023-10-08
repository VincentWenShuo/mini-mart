import { Router } from "express";

import imageController, {uploadImage} from "../../controllers/imageController";
const routes = Router();

routes.post("/image", imageController.uploadImage);

export default routes;