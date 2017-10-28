import { Component, OnInit } from '@angular/core';
import { PetService } from '@services/pet.service';
import { Pet } from '@interfaces/pet';

@Component({
  selector: 'eg-main-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public availablePets: Pet[] = [];

  constructor( private _pets: PetService ) {}

  ngOnInit() {
    this.availablePets = this._pets.allowedPets();
  }
}