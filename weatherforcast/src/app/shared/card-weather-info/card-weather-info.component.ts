import { Component, Input, OnInit } from '@angular/core';
import { faLocationDot, faSun, faTemperature0, faTint, faWind } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-card-weather-info',
    templateUrl: './card-weather-info.component.html',
    styleUrls: ['./card-weather-info.component.scss']
})
export class CardWeatherInfoComponent implements OnInit {

    constructor() { }

    @Input() weatherData: any;
    date: Date = new Date();
    faWind = faWind;
    faTint = faTint;
    faSun = faSun;
    falocation = faLocationDot;
    faTemp = faTemperature0;

    ngOnInit(): void {

    }


}
