import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class DataSetService {
  public invoices: Invoice[] = [];
  constructor(private httpClient: HttpClient) { }

  getInvoices() {
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
        }
    );
  }
}
