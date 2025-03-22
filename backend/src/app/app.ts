import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import * as dynamoose from 'dynamoose';
import bodyParser from 'body-parser';
import recipeRoutes from '../routes/recipeRoutes';

import {
    clerkMiddleware,
    createClerkClient,
    requireAuth,
} from "@clerk/express";
import userClerkRoutes from '../routes/userClerkRoutes';

/* CONFIGURATIONS */
dotenv.config();
export const isProduction = process.env.NODE_ENV === "production";
if (!isProduction) {
    dynamoose.aws.ddb.local();
}

export const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
});

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
app.use("/users/clerk", requireAuth(), userClerkRoutes);


export default app;