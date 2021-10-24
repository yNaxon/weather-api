import { AccuweatherHttpClient } from "../accuweather";
import { AccuweatherDailyForcastResourceInterface } from "../accuweather/types";
import ForcastRepository from "./forcast-repository.interface";
import ForcastInterface from "./forcast.interface";

export default class AccuweatherForcastRepository implements ForcastRepository {
  constructor(private client: AccuweatherHttpClient) { }

  async getById(id: string): Promise<ForcastInterface> {
    const response = await this.client.request<AccuweatherDailyForcastResourceInterface>({
      url: `forecasts/v1/daily/5day/${id}`
    });

    const resource: ForcastInterface = {
      locationId: id,
      forcast: response.data.DailyForecasts.map(dailyForcast => ({
        date: dailyForcast.Date,
        min: dailyForcast.Temperature.Minimum.Value,
        max: dailyForcast.Temperature.Maximum.Value,
        dayIcon: dailyForcast.Day.Icon,
        dayPhrase: dailyForcast.Day.IconPhrase,
        nightIcon: dailyForcast.Night.Icon,
        nightPhrase: dailyForcast.Night.IconPhrase,
        temperatureUnit: 'F',
      }))
    }

    return resource;
  }
}