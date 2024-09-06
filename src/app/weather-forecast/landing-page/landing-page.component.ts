import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTemperature0 } from '@fortawesome/free-solid-svg-icons'
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, map, switchMap } from 'rxjs';
import { GeoNameData } from 'src/app/@core/model/cities-info-res.model';
import { CurrentCondition, Weather, WeatherForecastRes } from 'src/app/@core/model/country-weather-res.model';
import { GeoLocationRes } from 'src/app/@core/model/geolocation-res.model';
import { WeatherService } from 'src/app/@core/service/weather.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  longitude!: number;
  latitude!: number;
  faTemp = faTemperature0;
  currentLocation!: string;
  cities!: GeoNameData[];
  weatherData!: CurrentCondition;
  constructor(private weatherService: WeatherService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.spinner.show();

    this.getLocation();

  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;

          this.weatherService.getGeoLocation(this.latitude, this.longitude).pipe(
            switchMap(res => {
              const paramForApi2 = res.features[0].properties.country;
              const paramForApi3 = res.features[0].properties.country_code;
              return forkJoin({
                api2: this.weatherService.getCountryWeather(paramForApi2, 10),
                api3: this.weatherService.getCities(paramForApi3)
              }).pipe(
                map(results => ({
                  api1Response: res,
                  api2Response: results.api2,
                  api3Response: results.api3
                }))
              );
            })
          ).subscribe(finalResults => {
            this.weatherData = finalResults.api2Response.data.current_condition[0];
            this.weatherData.currentLocation = finalResults.api1Response.features[0].properties.country
            this.cities = finalResults.api3Response.geonames;
            this.getCitiesTemp();
            this.spinner.hide();
          });
        }
      }
      )
    }
  }
  getCitiesTemp() {
    let lat;
    let lng;
    for (let i = 0; i < this.cities.length; i++) {
      lat = parseFloat(this.cities[i].lat);
      lng = parseFloat(this.cities[i].lng);

      this.weatherService.getCountryWeather(`${lat},${lng}`, 1)
        .subscribe((res) => {
          this.cities[i].temp = res.data.current_condition[0].temp_C
        })
    }
  }
  onWeatherButtonClick(data: GeoNameData) {
    this.router.navigateByUrl('/city');
    this.weatherService.geoCityData = data;
  }
}
