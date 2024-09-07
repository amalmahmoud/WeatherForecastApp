import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3'


@Component({
  selector: 'app-week-bar-chart',
  templateUrl: './week-bar-chart.component.html',
  styleUrls: ['./week-bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class D3LineChartComponent implements AfterViewInit {
  @Input() public dataset!: any[];

  @ViewChild('chart') private chartContainer!: ElementRef;
  constructor(public chartElem: ElementRef) {

  }
  @HostListener('window:resize')
  onResize(): void {
    this.initializeBarChart();
  }
  ngAfterViewInit() {
    if (this.dataset) {
      this.initializeBarChart();
    }
    window.addEventListener('resize', this.onResize.bind(this));


  }
  private initializeBarChart(): void {

 
    var margin = { top: 20, right: 30, bottom: 40, left:  20};

    const element = this.chartContainer.nativeElement;
    const width = element.offsetWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    d3.select(element).selectAll('*').remove(); // Clear the chart before re-drawing

    const svg = d3.select(element)
        .append('svg')
        .attr('width', '100%')
        .attr('height', height + margin.top + margin.bottom)
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.bottom + margin.top}`)
        .append('g')
        .attr("transform", `translate(${margin.left + margin.right},${margin.top})`)


    const xDomain = this.dataset.map(d => new Date(d.date).toISOString());

    // Create x scale
    const x = d3.scaleBand()
      .domain(xDomain)
      .range([0, width])
      .padding(0.2)

    // Create y scale
    const y = d3.scaleLinear()
      .domain([d3.min(this.dataset, d => d.maxtempC) - 2, d3.max(this.dataset, d => d.maxtempC)])
      .nice()
      .range([height, 0]);

    // Append x-axis
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(d3.timeDay).tickFormat(
        (d => d3.timeFormat('%a')(new Date(d)))))


    // Append y-axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Append bars
    svg.selectAll('rect')
      .data(this.dataset)
      .enter()
      .append('rect')
      .transition()
      .duration(400)
      .attr('x', d => (x(new Date(d.date).toISOString()) || 0)) 
      .attr('y', d => y(parseInt(d.maxtempC)))
      .attr('width', x.bandwidth()) 
      .attr('height', d => height - y(parseInt(d.maxtempC)))
      .attr('fill', 'steelblue');




    //x axis title

    svg.append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 10)
      .text("Day")

    // y axis title
    svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y",-margin.right)
      .attr("x", -margin.top)
      .text("Temperature °C")


  }
}