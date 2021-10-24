import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { accuweatherErrorMiddleware, errorMiddleware } from './middlewares';

const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());
app.use(routes);
app.use(accuweatherErrorMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`app is running on port ${port}.`);
});