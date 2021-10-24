import fs from 'fs'
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { AccuweatherHttpClient } from './accuweather';
import { AccuweatherLocationRepository } from './location';
import { AccuweatherForcastRepository } from './forcast';
import { AccuweatherError } from './accuweather/accuweather-error';

const app = express();
const port = 3000;

app.use(cors());
app.use(helmet());

const accuweather = new AccuweatherHttpClient({
  baseUrl: process.env.ACCUWEATHER_API_BASE_URL,
  apiKeys: JSON.parse(fs.readFileSync(process.env.ACCUWEATHER_API_KEYS_FILE, 'utf8'))
});

app.get('/search', async (req, res, next) => {
  try {
    const query = req.query.search as string;
    const repository = new AccuweatherLocationRepository(accuweather);

    const locations = await repository.search(query);

    res
      .status(200)
      .json({
        data: locations,
      });
  } catch (error) {
    next(error);
  }
});

app.get('/:locationId', async (req, res, next) => {
  try {
    const { locationId } = req.params;
    const repository = new AccuweatherLocationRepository(accuweather);

    const location = await repository.getById(locationId);

    res.status(200)
      .json({
        data: location,
      });
  } catch (error) {
    next(error);
  }
});

app.get('/:locationId/forcast', async (req, res, next) => {
  try {
    const { locationId } = req.params;
    const repository = new AccuweatherForcastRepository(accuweather);

    const forcast = await repository.getById(locationId);

    res.json({
      data: forcast,
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, req, res, next) => {
  if (!(error instanceof AccuweatherError)) {
    next(error);
  }
  
  console.error(error);

  res.status(502).json({
    error: "Service unavailable. Please try again later",
  });
});

app.use((error, req, res, next) => {
  console.error(error);
  const stautsCode = 500;
  const message = "An unknown error uccoured";

  res.status(stautsCode).json({
    error: message
  });
});

app.listen(port, () => {
  console.log(`app is running on port ${port}.`);
});