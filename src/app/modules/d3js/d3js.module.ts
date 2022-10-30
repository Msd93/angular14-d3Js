import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { D3jsRoutingModule } from './d3js-routing.module';
import { GraphOneComponent } from './graph-one/graph-one.component';


@NgModule({
  declarations: [
    GraphOneComponent
  ],
  imports: [
    CommonModule,
    D3jsRoutingModule
  ], 
})
export class D3jsModule { }
