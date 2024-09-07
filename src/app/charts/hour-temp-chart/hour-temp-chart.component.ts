import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3'
import { Hourly } from '../../@core/model/country-weather-res.model';


@Component({
  selector: 'app-hour-temp-chart',
  templateUrl: './hour-temp-chart.component.html',
  styleUrls: ['./hour-temp-chart.component.scss']
})

export class D3HourTempChartComponent implements AfterViewInit {
  @Input() public dataset!: Hourly[];

  constructor(public chartElem: ElementRef) {

  }
  data!: Hourly[];
  ngOnInit() {

    this.data = this.dataset;

  }
  @HostListener('window:resize')
  onResize(): void {
    this.initializeChart();
  }
  ngAfterViewInit() {
    if(this.dataset)
      {
        this.initializeChart();
      }
    window.addEventListener('resize', this.onResize.bind(this));

  }
      
  private initializeChart(): void {
    const element = this.chartElem.nativeElement.querySelector('.hourchart');

 
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = element.offsetWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(element).selectAll('*').remove(); // Clear the chart before re-drawing

    const parseTime = (timeStr: string) => {
      const time = timeStr.padStart(4, '0');
      const hours = parseInt(time.substring(0, 2), 10);
      const minutes = parseInt(time.substring(2, 4), 10);
      const day = new Date().getDay();
      const month = new Date().getMonth();
      const year = new Date().getFullYear();
      return new Date(year, month, day + 1, hours, minutes);
    };
    const data = JSON.parse(JSON.stringify(this.dataset));

    // console.log(data)
    data.map((d: any) => {

      d.time = parseTime(d.time)
    });
    // Create scales
    const x = d3.scaleTime()
      .domain(d3.extent<any, any>(data, d => d.time) as [any, any])
      .range([0, width]);

    const maxValue: any = d3.max(data, (d: any) => parseInt(d.tempC));
    const minValue: any = d3.min(data, (d: any) => parseInt(d.tempC));
    const y = d3.scaleLinear()
      .domain([minValue - 5, maxValue + 5])
      .range([height, 0]);


    // Create SVG container
    const svg = d3.select(element)
      .append('svg')
      .attr("width", '100%')
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)


    // Add X Axis
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(
        ((d: any) => d3.timeFormat('%I%p')(new Date(d))) // Format date strings
      ))

    // Add Y Axis
    svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

    // Add the line
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#088dda")
      .attr("stroke-width", 3)
      .attr("d", d3.line()
        .x((d: any) => {
          // console.log(d.time);
          return x(new Date(d.time))
        })

        .y(((d: any) => y(parseInt(d.tempC)))


        )
        .curve(d3.curveCatmullRom.alpha(0.5))

      )


    //x axis title

    // svg.append("text")
    //   .attr("text-anchor", "end")
    //   .attr("x", width)
    //   .attr("y", height + margin.top + 10)
    //   .text("Time")
    //   .style('fill', "#000")
    // y axis title
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top)
      .text("Temperature °C")
      .style('fill', "#000")


      //area
    svg.append("path")
      .datum(data)
      .attr("fill", "#5E99D7")
      .attr("fill-opacity", .3)
      .attr("stroke", "none")
      .attr("d", d3.area()
        .x((d: any) =>
          x(new Date(d.time))
        )
        .y0(height)
        .y1((d: any) => y(parseInt(d.tempC)))

      )



      // dot on circle

    svg.selectAll("line-circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("fill",  "#088dda")
      .attr("cx", (d: any) => x(new Date(d.time)))
      .attr("cy", (d: any) => y(parseInt(d.tempC)));

  }


}
interface DataPoint {

  maxtempC: string,
  time: string,
  tempC: string

}
