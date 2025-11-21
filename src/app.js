import {errorHandler, notFoundHandler} from './middlewares/error-handlers.js';
import express from 'express';
import api from './api/index.js'


const app = express();




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', api);
app.use('/public', express.static('public'))
app.use(notFoundHandler);
app.use(errorHandler);

export default app;


