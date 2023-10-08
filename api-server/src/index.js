import "express-async-errors";
import "dotenv/config";
import express from "express";
import cors from 'cors';

import v1Routes from "./routes/v1";
import { errorHandlingMiddleware } from "./middlewares";

const app = express();
const port = Number(process.env.PORT);

app.use(express.json());
app.use(cors());
app.use("/v1", v1Routes);
app.use('/images', express.static('images'));
app.use(errorHandlingMiddleware);

app.listen(port, () => console.log(`Listening on port ${port}`));
