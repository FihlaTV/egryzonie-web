import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { VetsComponent } from './vets.component';

const vetsRoutes: Routes = [
  {
    path: 'vets',
    component: VetsComponent
  }
];

@NgModule({
  imports: [ RouterModule.forChild(vetsRoutes) ],
  exports: [ RouterModule ]
})
export class VetsRoutingModule { }