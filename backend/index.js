// import express from "express"
// // import {port} from "./config"
// import { port ,mongodburl} from './config.js'
// import mongoose from "mongoose"
// import { Book } from "./models/bookModels.js"
// import bookRoute from "./routes/bookRoute.js"
// import cors from "cors"
// const app=express()
// app.use(express.json())
// app.use(cors)
// app.get('/',(req,res)=>{
//     console.log(req)
//     res.send("HI from Server")
// })
// app.use('/books',bookRoute)
// mongoose.connect('mongodb://localhost:27017/bookstore').then(()=>{
//     console.log("App connected to database")
//     app.listen(5555,()=>{
//     console.log("server running on port 5555")
//     })
// }).catch((err)=>{
//     console.log(err)
// })

import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
