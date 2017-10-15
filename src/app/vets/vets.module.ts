import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';

// Components
import { VetsComponent } from './vets.component';
import { VetsListComponent } from './vets-list/vets-list.component';
import { VetViewComponent } from './vet-view/vet-view.component';

// Routing
import { VetsRoutingModule } from './vets-routing.module';

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
    })
  ],
  declarations: [
    VetsComponent,
    VetsListComponent,
    VetViewComponent
  ],
  providers: [
    VetsService
  ]
})
export class VetsModule { }
