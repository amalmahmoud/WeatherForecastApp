import { DataRequest, Weather } from "./country-weather-res.model";

export interface PastWeatherRes {

    data: ForecastData;
}
interface ForecastData {

    request: DataRequest[];
    weather: Weather[];

}