const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
require('./db/dbconnect');
const route = require('./Routes/route');
app.use(route);


app.listen(5000, () => {
    console.log("startes");
})