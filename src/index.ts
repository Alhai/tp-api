const dotenv = require('dotenv');
import express, { Express, Request, Response } from "express";
import mongoose, { connect } from "mongoose";


mongoose.connect("mongodb+srv://ali:9Tj8er9DIeA5CK38@apiexpress.hmiffkr.mongodb.net/?retryWrites=true&w=majority", {}).then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.post('/newAccount',(req, res)=>{

})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});