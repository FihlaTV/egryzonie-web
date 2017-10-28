import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from 'environments/environment';
import { SharedModule } from '../shared/shared.module';

// Routing
import { VetsRoutingModule } from './vets-routing.module';

// Components
import { VetsComponent } from './vets.component';
import { VetsSearchComponent } from './vets-search/vets-search.component';
import { VetsSearchResultsComponent } from './vets-search/vets-search-results/vets-search-results.component';
import { VetsMapComponent } from './vets-map/vets-map.component';
import { VetDetailsComponent } from './vet-details/vet-details.component';

// Services
import { VetSearchService } from './vet-search.service';
import { VetFetchService } from './vet-fetch.service';

// Third-party
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    VetsRoutingModule,
    SharedModule
  ],
  declarations: [
    VetsComponent,
    VetsSearchComponent,
    VetsSearchResultsComponent,
    VetsMapComponent,
    VetDetailsComponent
  ],
  providers: [
    VetSearchService,
    VetFetchService
  ]
})
export class VetsModule { }
