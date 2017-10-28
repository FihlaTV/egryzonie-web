import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
import { SharedModule } from '../shared/shared.module';

// Routing
import { PetsRoutingModule } from './pets-routing.module';

// Components
import { PetsComponent } from './pets.component';

// Services

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    PetsComponent
  ],
  providers: [
  ]
})
export class PetsModule { }
