import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";



const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
const port = 3000;


app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(port, () => {
    console.log(`the Server is started at port http://localhost:${port}`);
})