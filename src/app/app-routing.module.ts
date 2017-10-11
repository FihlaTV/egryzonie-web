import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VetsComponent } from './vets/vets.component';
import { VetsListComponent } from './vets/vets-list/vets-list.component';
import { VetViewComponent } from './vets/vet-view/vet-view.component';

const routes: Routes = [
  { path: 'vets', component: VetsComponent, pathMatch: 'full',
    children: [
      { path: '', component: VetsListComponent },
      { path: 'view/:vetId', component: VetViewComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
