import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';


import postRoutes from './routes/postRoutes.js'
import imaginAi from './routes/imaginAi.js'


dotenv.config();

const app=express();
app.use(cors());
app.use(express.json({limit : '50mb'}));

app.use('/api/v1/post' , postRoutes)
app.use('/api/v1/imaginai' , imaginAi)

app.get('/' , async(req, res) => {
    res.send("Hellow World");
})

const startServer= async () => {

    try{
        connectDB(process.env.MONGODB_URL)
        app.listen(8000 , () => console.log("server has started on port 8000"))
    }
    catch(error){
        console.log(error);
    }
}

startServer();