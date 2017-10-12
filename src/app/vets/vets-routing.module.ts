import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { VetsComponent } from './vets.component';
import { VetsListComponent } from './vets-list/vets-list.component';
import { VetViewComponent } from './vet-view/vet-view.component';

const vetsRoutes: Routes = [
  {
    path: '',
    component: VetsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list'
      },
      {
        path: 'list',
        component: VetsListComponent
      },
      {
        path: 'view/:vetId',
        component: VetViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(vetsRoutes) ],
  exports: [ RouterModule ]
})
export class VetsRoutingModule { }