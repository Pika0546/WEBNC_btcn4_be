import express from 'express';
import dotenv from 'dotenv';
import createError from 'http-errors';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { APIStatus } from './lib/common';
import { myCors } from './middleware/cors';
import { router } from './route';

dotenv.config();
const port = 3030;
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(myCors());
router(app)

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT || port}`);
})




