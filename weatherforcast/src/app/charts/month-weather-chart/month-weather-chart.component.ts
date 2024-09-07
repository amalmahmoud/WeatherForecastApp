import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3'


@Component({
  selector: 'app-month-weather-chart',
  templateUrl: './month-weather-chart.component.html',
})

export class HistoricalWeatherChartComponent implements AfterViewInit {
  @Input() public dataset: any;
  @ViewChild('historical') private chartContainer!: ElementRef;



  constructor(public chartElem: ElementRef) {

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

    const element = this.chartContainer.nativeElement;


    // Set up dimensions
    const margin = { top: 40, right: 40, bottom: 50, left: 50 };
    const width = element.offsetWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(element).selectAll('*').remove(); // Clear the chart before re-drawing

    // Create scales
    const x = d3.scaleTime()
      .domain(d3.extent<any, any>(this.dataset, d => new Date(d.date)) as [any, any])
      .range([0, width]);

    const maxValue: any = d3.max(this.dataset, (d: any) => parseInt(d.maxtempC));

    const minValue: any = d3.min(this.dataset, (d: any) => parseInt(d.mintempC));
    const y = d3.scaleLinear()
      .domain([minValue - 5, maxValue + 5])
      .range([height, 0]);


    // Create SVG container
    const svg = d3.select(element)
      .append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.bottom + margin.top}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
      .attr("class", "chart-border")



    // Add X Axis
    svg.append("g")
      .attr("class", "axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(d3.timeDay.every(2)).tickFormat(
        ((d: any) => d3.timeFormat("%d")(new Date(d))) // Format date strings
      ))

    // Add Y Axis
    svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y));

    // Add the line
    svg
      .append("path")
      .datum(this.dataset)
      .attr("fill", "none")
      .attr("stroke", "red")
      .attr("stroke-width", 1.5)
      .attr ("d", d3.line()
      .x((d: any) => x(new Date(d.date)))
      .y(((d: any) => y(parseInt(d.maxtempC))))
      .curve(d3.curveCatmullRom.alpha(0.5))
      )
    svg
      .append("path")
      .datum(this.dataset)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
      .x( (d: any) => x(new Date(d.date)) )
      .y((d: any) =>y(parseInt(d.mintempC)))
      .curve(d3.curveCatmullRom.alpha(0.5))
      )

    // y axis title
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top)
      .text("Temperature °C")
      .style('fill', "#000")

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 10)
      .text(new Date().toLocaleString('default', { month: 'long' }))
      .style('fill', "#000")

      var keys = ["Max", "Min"]

var color = d3.scaleOrdinal()
  .domain(keys)
  .range(d3.schemeSet1);

var size = 150
// Add one dot in the legend for each name.

svg.selectAll("mydots")
.data(keys)
.enter()
.append("rect")
  .attr("x", function (d, i) { return 10 + i * (size + 5)})
  .attr("y", -12)
  .attr("width", 15)
  .attr("height", 2)
  .style("fill", function(d){ return color(d) as string})

// // Add one dot in the legend for each name.
svg.selectAll("mylabels")
  .data(keys)
  .enter()
  .append("text")
  .attr("x", function (d, i) { return 30 + i * (size + 5)})
  .attr("y", -9 ) 
  .style("fill", function (d) { return color(d) as string })
  .text(function (d) { return d })
  .attr("text-anchor", "left")
  .style("alignment-baseline", "middle")

  }

}
