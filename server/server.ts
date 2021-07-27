import express, {
  Application, 
  Request,
  Response,
  NextFunction,
  json,
  urlencoded,
} from 'express';
import path from 'path';
import { config } from 'dotenv';
// import https from 'https';
// import fs from 'fs';

import loginRouter from './routes/login';
import searchRouter from './routes/search';
import savedResultsRouter from './routes/savedResults';

config();

const PORT = process.env.APP_PORT;
const app: Application = express();

app.use(json());
app.use(urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../dist')));
}

app.use('/login', loginRouter);
app.use('/search', searchRouter);
app.use('/savedResults', savedResultsRouter);

app.use('*', (req: Request, res: Response) => (
  res.status(404).send('Cannot find ' + req.baseUrl)
));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { status, log, message } = err;
  console.log(err.log || 'Error: unknown error occurred');

  return res.status(status || 500).send(message || 'An error occurred.');
});

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}...`);
});
