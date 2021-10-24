import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { AccuweatherError } from './accuweather-error';

export default class AccuweatherHttpClient {

  private httpClient: AxiosInstance;
  private apiKeys: Set<string>;

  constructor(config: AccuweatherHttpClientConfig) {    
    const { baseUrl, apiKeys } = config;

    if (!baseUrl) {
      throw new Error("You did not configure api base url");
    }
    if (!apiKeys) {
      throw new Error("You must configure at least one api key");
    }

    this.httpClient = axios.create({
      baseURL: baseUrl,
      validateStatus: status => status < 400,
      headers: {
        'Accept-Encoding': 'gzip,deflate'
      }
    });

    this.apiKeys = new Set(apiKeys);
  }

  async request<T>(config: AxiosRequestConfig) {

    for (const apiKey of this.apiKeys) {
      try {
        const request = AccuweatherHttpClient.signRequest(config, apiKey);
        return await this.httpClient.request<T>(request);
      } catch (error) {
        const invalidApiKey = error.response && error.response.status === 503;

        if (invalidApiKey) {
          continue;
        }

        if(error.response) {
          const message = error.response.data.Message || "Unknown error";
          throw new AccuweatherError(error.response.status, message, error);
        }

        throw new AccuweatherError(500, "Could not send request to accuweather api", error);
      }
    }

    throw new AccuweatherError(503, 'Reached api calls limit');
  }

  static signRequest(request: AxiosRequestConfig, key: string) {
    return {
      ...request,
      params: {
        ...(request.params || {}),
        apikey: key
      }
    }
  }
}


export interface AccuweatherHttpClientConfig {
  baseUrl: string;
  apiKeys: string[];
}