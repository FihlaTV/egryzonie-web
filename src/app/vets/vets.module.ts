import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { VetsComponent } from './vets.component';
import { VetsListComponent } from './vets-list/vets-list.component';
import { VetViewComponent } from './vet-view/vet-view.component';

// Routing
import { VetsRoutingModule } from './vets-routing.module';

// Services
import { VetsService } from './vets.service';

@NgModule({
  imports: [
    CommonModule,
    VetsRoutingModule
  ],
  declarations: [
    VetsComponent,
    VetsListComponent,
    VetViewComponent
  ],
  exports: [
  ],
  providers: [
    VetsService
  ]
})
export class VetsModule { }
