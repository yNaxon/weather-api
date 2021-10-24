export default interface ForcastInterface {
  locationId: string;
  forcast: {
    date: string;
    min: number;
    max: number;
    dayIcon: number;
    dayPhrase: string;
    nightIcon: number;
    nightPhrase: string;
    temperatureUnit: 'F';
  }[]
}