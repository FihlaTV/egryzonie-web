import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { PetsComponent } from './pets.component';

const petsRoutes: Routes = [
  {
    path: 'pets',
    component: PetsComponent,
    children: [
      {
        path: 'list',
        component: PetsComponent
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(petsRoutes) ],
  exports: [ RouterModule ]
})
export class PetsRoutingModule { }
