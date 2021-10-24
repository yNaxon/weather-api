export interface AccuweatherLocationResourceInterface {
  Version: number;
  Key: string;
  Type: AccuweatherLocationType;
  Rank: number;
  LocalizedName: string;
  Country: AccuweatherLocationAssociatedAreaInterface,
  AdministrativeArea: AccuweatherLocationAssociatedAreaInterface,
 }
 
 export type AccuweatherLocationType = 'City' | 'PostalCode' | 'POI' | 'LatLong';
 
 export interface AccuweatherLocationAssociatedAreaInterface {
   ID: string;
   LocalizedName: string;
 }
 
 export interface AccuweatherDailyForcastResourceInterface {
   Headline: AccuweatherForcastHeadlineInterface;
   DailyForecasts: DailyForecastInterface[];
 }
 
 export interface AccuweatherForcastHeadlineInterface {
   EffectiveDate: string;
   EffectiveEpochDate: number;
   Severity: AccuweatherForcastSeverityType;
   Text: string;
   Category: string;
   EndDate: string | null;
   EndEpochDate: number | null;
   MobileLink: string;
   Link: string;
 }
 
 export interface DailyForecastInterface {
   Date: string;
   EpochDate: number;
   Temperature: {
     Minimum: ForcastTemperatureValueInterface,
     Maximum: ForcastTemperatureValueInterface,
   },
   Day: ForcastTimeUnitInterface;
   Night: ForcastTimeUnitInterface;
   Sources: string[];
   MobileLink: string;
   Link: string;
 }
 
 export interface ForcastTemperatureValueInterface {
   Value: number,
   Unit: "F" | "C",
   UnitType: number,
 }
 
 export interface ForcastTimeUnitInterface {
   Icon: number;
   IconPhrase: string;
   HasPrecipitation: boolean;
 }
 
 export type AccuweatherForcastSeverityType = 0|1|2|3|4|5|6|7;