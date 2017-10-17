import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
import { SharedModule } from '../shared/shared.module';

// Routing
import { VetsRoutingModule } from './vets-routing.module';

// Components
import { VetsComponent } from './vets.component';
import { VetsListComponent } from './vets-list/vets-list.component';
import { ListDisplayComponent } from './vets-list/list-display/list-display.component';
import { VetViewComponent } from './vet-view/vet-view.component';

// Services
import { VetsService } from './vets.service';

// Third-party
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    VetsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleKey
    }),
    SharedModule
  ],
  declarations: [
    VetsComponent,
    VetsListComponent,
    ListDisplayComponent,
    VetViewComponent
  ],
  providers: [
    VetsService
  ]
})
export class VetsModule { }
