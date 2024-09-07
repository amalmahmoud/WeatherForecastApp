import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {  ViewportScroller } from '@angular/common'; 
import { filter } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router,
    private viewPortScroller: ViewportScroller,
    private spinner: NgxSpinnerService
  ) {

  }
  title = 'Weather Forecast';

  ngOnInit(): void {
    if (!this.router.navigated) {
      this.router.navigate(['/dashboard']);
    }
    this.router.events.pipe(
      filter((event:any) => event instanceof NavigationEnd))
      .subscribe(() => this.viewPortScroller.scrollToPosition([0, 0]));

      this.spinner.show();
  }
}
