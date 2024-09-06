import { WeatherService } from 'src/app/@core/service/weather.service';
import { Component, OnInit } from '@angular/core';
import { CurrentCondition, Hourly, Month, Weather } from 'src/app/@core/model/country-weather-res.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-city-weather-forecast',
  templateUrl: './city-weather-forecast.component.html',
  styleUrls: ['./city-weather-forecast.component.scss']
})
export class CityWeatherForecastComponent implements OnInit {

  constructor(private weatherService: WeatherService,
    private spinner: NgxSpinnerService,
  ) { }
  weatherData!: CurrentCondition;
  currentLocation!: string;
  temp!: string;
  date: Date = new Date();
  cityName!: string;
  cityData!: Weather[];
  todayHours!: Hourly[];
  tomorrowHours!: Hourly[];
  historicalWeather!: Weather[];
  yearData!: Month[]
  selectedTab = 'Today';
  tabList = [
    {
      day: 'Today',
    },
    {
      day: 'Tomorrow'
    }
  ]
  ngOnInit(): void {
    this.spinner.show();
    this.cityName = this.weatherService.geoCityData.name;
    this.currentLocation = this.weatherService.geoCityData.lat + ',' + this.weatherService.geoCityData.lng;
    this.getCityWeather();
    this.getHistoricalWeatherData()

  }
  getCityWeather() {
    this.weatherService.getCountryWeather(this.currentLocation, 8).subscribe((res) => {
      this.weatherData = res.data.current_condition[0];
      this.weatherData.currentLocation = this.cityName;
      this.cityData = res.data.weather
      this.todayHours = res.data.weather[0].hourly;
      this.tomorrowHours = res.data.weather[1].hourly;
      this.yearData = res.data.ClimateAverages[0].month
    })
  }
  getHistoricalWeatherData() {
    this.weatherService.getHistoricalWeatherData(this.currentLocation).subscribe((res) => {
      this.historicalWeather = res.data.weather;
      this.spinner.hide();

    })
  }
  tabChange(tab: any) {

    this.selectedTab = tab;
  }
}
