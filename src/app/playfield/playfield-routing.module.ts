import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { PlayfieldComponent } from './playfield.component';
import { GmapsTestsComponent } from './gmaps-tests/gmaps-tests.component';
import { GeocoderComponent } from './geocoder/geocoder.component';
import { FormsComponent } from './forms/forms.component';

const playfieldRoutes: Routes = [
  {
    path: 'playfield',
    component: PlayfieldComponent,
    children: [
      { path: 'gmaps-tests', component: GmapsTestsComponent },
      { path: 'geocoder', component: GeocoderComponent },
      { path: 'forms', component: FormsComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(playfieldRoutes) ],
  exports: [ RouterModule ]
})
export class PlayfieldRoutingModule { }
