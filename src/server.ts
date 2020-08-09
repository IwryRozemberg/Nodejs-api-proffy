import express from 'express';
import cors from 'cors';

import routes from './routes';

const
  app = express(),
  environment: string = process.env.ENV || 'development',
  { port, host } = require('./config/config')[environment];

app.use(cors());
app.use(routes);
app.use(express.json());

app.listen(port, host, () => { console.log(`CORS-enabled web server listening on port ${port}`) });