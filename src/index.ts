const dotenv = require('dotenv');
import express from "express";
import mongoose, { connect } from "mongoose";
import bodyParser from 'body-parser';
import cors from "cors";
import { userRouter } from "./controllers/user-controller";

mongoose.connect("mongodb+srv://aly:c9kbx7RGAieRAkhC@cluster0.hnzlbbl.mongodb.net/?retryWrites=true&w=majority", {}).then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

dotenv.config();

const app = express();
app.use(bodyParser.json())
app.use(cors())
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});