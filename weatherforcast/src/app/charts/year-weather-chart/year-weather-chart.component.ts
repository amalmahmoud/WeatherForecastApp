import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import * as d3 from 'd3'


@Component({
    selector: 'app-year-weather-chart',
    templateUrl: './year-weather-chart.component.html',
    styleUrls: ['./year-weather-chart.component.scss'],
})

export class YearWeatherChartComponent implements AfterViewInit {
    @Input() public dataset: any;
    @ViewChild('chart') private chartContainer!: ElementRef;



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

        var margin = { top: 20, right: 30, bottom: 40, left: 30 };

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
            .attr('transform', `translate(${margin.left},${margin.top})`)



        this.dataset.map((d: any) => {
            d.name = d.name.slice(0, 3)
        })
        var x = d3.scaleBand()
            .rangeRound([0, width])
            .padding(0.1)
            .domain(this.dataset.map((d: any) => d.name));

        const dmax = this.dataset.map(function (d: any) {
            return d.absMaxTemp;
        })
        const yScaleLeft = d3.scaleLinear()
            .domain([0, d3.max(this.dataset, (d: any) => d.absMaxTemp) as any])
            .nice()
            .range([height, 0]);

        const yScaleRight = d3.scaleLinear()
            .domain([d3.min(this.dataset, (d: any) => d.avgDailyRainfall), d3.max(this.dataset, (d: any) => d.avgDailyRainfall) as any])
            .nice()
            .range([height, 0]);



        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))




        // Add y-axis for temperature (left)
        svg.append("g")
            .attr("class", "y-axis-left")
            .call(d3.axisLeft(yScaleLeft));

        // Add y-axis for average rainfall (right)
        svg.append("g")
            .attr("class", "y-axis-right")
            .attr("transform", `translate(${width}, 0)`)
            .call(d3.axisRight(yScaleRight));


        var bar = svg.selectAll("rect")
            .data(this.dataset)
            .enter().append("g");
        // bar chart
        bar.append('rect')
            .attr("class", "bar")
            .attr("x", (d: any) => x(d.name) || 0)
            .attr("y", (d: any) => yScaleLeft(parseInt(d.absMaxTemp)))
            .attr("width", x.bandwidth())
            .attr("height", (d: any) => height - yScaleLeft(parseInt(d.absMaxTemp)))
            .attr("fill", "steelblue");

        // line chart
        const line = d3.line<{ name: string; avgDailyRainfall: any }>()
            .x(d => x(d.name) || 0 + x.bandwidth() / 2)  // Center of each bar
            .y(d => yScaleRight(d.avgDailyRainfall) || 0);
            svg.append("path")
            .datum(this.dataset)
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2);
            
    var keys = ["Avg RainFall", "Temp °C"]

    var color = d3.scaleOrdinal()
      .domain(keys)
      .range(d3.schemeSet1);

    // Add one dot in the legend for each name.
    var size = 150
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
