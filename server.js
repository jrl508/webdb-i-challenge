const express = require('express');
const accounts = require('./accounts/accountsRouter')
const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use('/accounts', accounts)

module.exports = server;