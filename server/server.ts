require('dotenv').config();
const express = require('express');
const path = require ('path');
const https = require('https');
const fs = require('fs');

const PORT = process.env.APP_PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res)=>{
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/dist/bundle.js', (req, res)=>{
  res.status(200).sendFile(path.join(__dirname, '../dist/bundle.js'));
});

// routes
import searchRouter from './routes/search';
app.use('/search', searchRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Cannot find ' + req.baseUrl);
});

// global error handler
app.use((err, req, res, next) => {
  console.log((err.log || 'Error: unknown error occured'));
  res.status(err.status || 500).send(err.message || 'unknown error');
});

// start server
app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}...`);
});