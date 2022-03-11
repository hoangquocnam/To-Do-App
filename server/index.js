const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const { router } = require('./routers')
const { logger } = require('./utils/logger.js')

const hostname = "localhost"
const port = "5000"

const uriDB = "mongodb+srv://thanhtailt1223:tailt1007@cluster0.mv93c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(uriDB);

const connection = mongoose.connection

connection
    .on('connected', () => {
        logger.info('Connected Database')
    })
    .on('disconnected', () => {
        logger.warn('Disconnect Database');
        
    })
    .on('error', (error) => {
        logger.error(error)
    })

const server = express();

server.use(cors())

server.use(router);


server.listen(port, () => {
    logger.info(`Server running at http://${hostname}:${port}`);
})
