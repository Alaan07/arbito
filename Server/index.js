import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import 'dotenv/config';



const app = express();
const port = process.env.PORT || 3000;
const Eusername = process.env.USER_NAME;
const Epassword = process.env.PASSWORD;


app.use(cors());
app.use(express.json());
app.use(cookieParser());




app.post("/api/login", (req, res) => {
    const {username, password} = req.body;
    if((username === Eusername) && (password === Epassword)){
         res.status(200).json({ message: 'Hello from backend!', islogin: true});
    }
    else{
        res.status(200).json({message:'Invalid username or password!', islogin: false});
    }
})













app.listen(port, () => {
    console.log(`the Server is started at port http://localhost:${port}`);
})