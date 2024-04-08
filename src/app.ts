import dotenv from 'dotenv'
dotenv.config()


import express from 'express';

import { dbConfiguration } from './configs'
import { pagination } from "typeorm-pagination";

import { mainRouter } from './router'

const app = express();
const port = process.env.APP_PORT || 3000;

dbConfiguration
    .initialize()
    .then(() => {
        console.log("db connection  established!");
    })
    .catch((err) => {
        console.error(`could not establish db connection:--->\n${err} \n <---- DB error ***`);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(pagination)
app.use(mainRouter)


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});