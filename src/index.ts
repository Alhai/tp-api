import express, { Router } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import "dotenv/config"
import { userRouter } from './controllers/user-controller';
import jwt from 'jsonwebtoken';
import cors from 'cors'
const port = process.env.PORT || 3012;
const MONGODB_URL = process.env.MONGO_URL as string

const dotenv = require('dotenv');


mongoose.connect("mongodb+srv://ali:9Tj8er9DIeA5CK38@apiexpress.hmiffkr.mongodb.net/?retryWrites=true&w=majority", {}).then(() => console.log("Connexion à MongoDB réussie !!!!"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.post('/newAccount',(req, res)=>{

})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});