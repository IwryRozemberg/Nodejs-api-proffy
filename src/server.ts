import express from 'express';
import cors from 'cors';

import routes from './routes';

const
  app = express(),
  port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3333;
  
app.use(cors());
app.use(routes);
app.use(express.json());

app.listen(port, () => {console.log(`CORS-enabled web server listening on port ${port}`)});