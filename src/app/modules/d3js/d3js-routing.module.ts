import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraphOneComponent } from './graph-one/graph-one.component';

const routes: Routes = [
  {
    path: '',
    component: GraphOneComponent
  },
  {
    path: 'graph-one',
    component: GraphOneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class D3jsRoutingModule { }
