import fs from 'fs';
import express from 'express';
import { AccuweatherHttpClient } from './accuweather';
import { AccuweatherLocationRepository } from './location';
import { AccuweatherForcastRepository } from './forcast';

const router = express.Router();

const accuweather = new AccuweatherHttpClient({
  baseUrl: process.env.ACCUWEATHER_API_BASE_URL,
  apiKeys: JSON.parse(fs.readFileSync(process.env.ACCUWEATHER_API_KEYS_FILE, 'utf8'))
});

router.get('/search', async (req, res, next) => {
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

router.get('/:locationId', async (req, res, next) => {
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

router.get('/:locationId/forcast', async (req, res, next) => {
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

export default router;