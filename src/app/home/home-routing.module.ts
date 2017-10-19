import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './home.component';

const vetsRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(vetsRoutes) ],
  exports: [ RouterModule ]
})
export class HomeRoutingModule { }