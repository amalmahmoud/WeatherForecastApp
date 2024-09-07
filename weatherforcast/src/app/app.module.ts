import { D3LineChartComponent } from './charts/week-bar-chart/week-bar-chart.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { WeatherService } from './@core/service/weather.service';
import { LandingPageComponent } from './weather-forecast/landing-page/landing-page.component';
import { CityWeatherForecastComponent } from './weather-forecast/city-weather-forecast/city-weather-forecast.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardWeatherInfoComponent } from './shared/card-weather-info/card-weather-info.component';
import { D3HourTempChartComponent } from './charts/hour-temp-chart/hour-temp-chart.component';
import { HistoricalWeatherChartComponent } from './charts/month-weather-chart/month-weather-chart.component';
import { YearWeatherChartComponent } from './charts/year-weather-chart/year-weather-chart.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    AppComponent,
    D3LineChartComponent,
    LandingPageComponent,
    CityWeatherForecastComponent,
    HeaderComponent,
    CardWeatherInfoComponent,
    D3HourTempChartComponent,
    HistoricalWeatherChartComponent,
    YearWeatherChartComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    NgxSpinnerModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
