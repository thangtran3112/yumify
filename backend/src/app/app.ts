import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import * as dynamoose from 'dynamoose';
import bodyParser from 'body-parser';
import recipeRoutes from '../routes/recipeRoutes';

/* CONFIGURATIONS */
dotenv.config();
export const isProduction = process.env.NODE_ENV === "production";
if (!isProduction) {
    dynamoose.aws.ddb.local();
}

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.get("/", (_, res) => {
    res.send("Hello World");
});
app.use("/recipes", recipeRoutes);

export default app;