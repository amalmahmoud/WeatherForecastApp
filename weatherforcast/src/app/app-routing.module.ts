import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './weather-forecast/landing-page/landing-page.component';
import { CityWeatherForecastComponent } from './weather-forecast/city-weather-forecast/city-weather-forecast.component';
import { HistoricalWeatherChartComponent } from './charts/month-weather-chart/month-weather-chart.component';

const routes: Routes = [
  {
    path:'',component:LandingPageComponent
  },
  {
    path:'dashboard',component:LandingPageComponent
  },
  {
    path:'city', component:CityWeatherForecastComponent
  },
  { path: '**', redirectTo: '/dashboard' }  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
