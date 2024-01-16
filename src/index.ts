// src/index.js
// const express = require('express');
const dotenv = require('dotenv');
import express, { Express, Request, Response } from "express";

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