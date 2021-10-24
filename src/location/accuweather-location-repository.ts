import { AccuweatherHttpClient } from "../accuweather";
import { AccuweatherLocationResourceInterface } from "../accuweather/types";
import LocationRepositoryInterface from "./location-repository.interface";
import LocationInterface from "./location.interface";

export default class AccuweatherLocationRepository implements LocationRepositoryInterface {

  constructor(private client: AccuweatherHttpClient) { }
  
  async search(query: string): Promise<LocationInterface[]> {
    const response = await this.client.request<AccuweatherLocationResourceInterface[]>({
      url: 'locations/v1/cities/autocomplete',
      params: {
        q: query,
      }
    });
    const locations: LocationInterface[] = response.data.map(location => ({
      id: location.Key,
      name: location.LocalizedName,
      countryName: location.Country.LocalizedName
    }));

    return locations;
  }

  async getById(id: string): Promise<LocationInterface> {
    const response = await this.client.request<AccuweatherLocationResourceInterface>({
      url: `locations/v1/${id}`
    });

    const location: LocationInterface = {
      id: response.data.Key,
      name: response.data.LocalizedName,
      countryName: response.data.Country.LocalizedName
    }

    return location;
  }
}