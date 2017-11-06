import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';
import { SharedModule } from '../shared/shared.module';

// Routing
import { PlayfieldRoutingModule } from './playfield-routing.module';

// Components
import { PlayfieldComponent } from './playfield.component';
import { GmapsTestsComponent } from './gmaps-tests/gmaps-tests.component';
import { GeocoderComponent } from './geocoder/geocoder.component';

// Services

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PlayfieldRoutingModule
  ],
  declarations: [
    PlayfieldComponent,
    GmapsTestsComponent,
    GeocoderComponent
  ],
  providers: [
  ]
})
export class PlayfieldModule { }
