import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'

import postRouter from "./routes/posts.js"; 

const app = express();

app.use(bodyParser.json({ limit: "30mb", extanded: true }))
app.use(cors());

app.use('/', postRouter)






const CONNECTION_URL = "mongodb+srv://testdb:mern123@testdb.nuqjg.mongodb.net/?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5001;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopoLogy: true })
    .then((e) => { app.listen(PORT, (a) => console.log(`Server running on port: ${PORT}`)) })
    .catch((err) => { console.log(err) });


