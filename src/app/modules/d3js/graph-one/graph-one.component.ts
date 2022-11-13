import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { Invoice } from '../models/invoice.model';
import { DataSetService } from '../services/data-set.service';

@Component({
  selector: 'app-graph-one',
  templateUrl: './graph-one.component.html',
  styleUrls: ['./graph-one.component.scss']
})
export class GraphOneComponent implements OnInit {
  invoices: Invoice[] = [];
  private svg;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private httpClient: HttpClient) { 
  }

  ngOnInit(): void {
    this.httpClient.get('assets/folder/supermarket_sales.csv', {responseType: 'text'})
    .subscribe(data => {
            let csvToRowArray = data.split("\n");
            for (let index = 1; index < csvToRowArray.length - 1; index++) {
              let row = csvToRowArray[index].split(",");
              this.invoices.push(new Invoice(row[0], row[1].trim(), row[7]));
            }
        },
        error => {
            console.log(error);
        },
        () => {
          this.createSvg();
          this.drawBars(this.invoices);
        }
    );
  }

  private createSvg(): void {
    this.svg = d3.select("figure#bar")
      .append("svg")
      .attr("width", this.width + (this.margin * 2))
      .attr("height", this.height + (this.margin * 2))
      .append("g")
      .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
  }
  private drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.branch))
      .padding(0.2);

    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 20])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => x(d.branch))
      .attr("y", d => y(d.quantity))
      .attr("width", x.bandwidth())
      .attr("height", (d) => this.height - y(d.quantity))
      .attr("fill", "#d04a35");
  }

}
