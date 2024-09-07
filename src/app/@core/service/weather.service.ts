import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { WeatherForecastRes } from '../model/country-weather-res.model';
import { GeoLocationRes } from '../model/geolocation-res.model';
import { CitiesInfoRes, GeoNameData } from '../model/cities-info-res.model';
import { PastWeatherRes } from '../model/past-weather-res.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class WeatherService {
    KEY = '05426d4de03449f49b5111619243008';
    GE0KEY = '0086260217614b4f984a096b58cc5581'

    geoCityData!: GeoNameData;
    currentLocation!: string;
    constructor(private http: HttpClient) {

    }
    getCountryWeather(location: string, numOfDays: number): Observable<WeatherForecastRes> {
        return this.http.get<WeatherForecastRes>(environment.weather, {
            params: {
                key: this.KEY,
                q: location,
                num_of_days: numOfDays,
                format: 'json',
            }
        }
        )
    }

    getGeoLocation(latitude: number, longitude: number): Observable<GeoLocationRes> {

        return this.http.get<GeoLocationRes>(environment.geoLoc, {
            params: {
                lat: latitude,
                lon: longitude,
                apiKey: this.GE0KEY
            }
        });
    }
    getCities(country_code: string): Observable<CitiesInfoRes> {
        return this.http.get<CitiesInfoRes>(environment.citiesURL + 'api/searchJSON',
            {
                params: {
                    country: country_code,
                    username: "amalmahmoud",
                    maxRows: 10
                }
            }
        );

    }
    getHistoricalWeatherData(location: string): Observable<PastWeatherRes> {
        const today = new Date();
        return this.http.get<PastWeatherRes>(environment.historyLocalWeather, {
            params: {
                key: this.KEY,
                q: location,
                date: this.formatDate(new Date(today.getFullYear(), today.getMonth() - 1, 1)),
                enddate: this.formatDate(new Date(today.getFullYear(), today.getMonth(), 0)),
                format: 'json',
            }
        })

    }

    formatDate(date: Date) {
        var d = date,
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
}
