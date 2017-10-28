import { Component, OnInit } from '@angular/core';
import { PetService } from '@services/pet.service';
import { Pet } from '@interfaces/pet';

@Component({
  selector: 'eg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public speciesList: Pet[];
  public selectedPet: Pet;

  constructor( private _pet: PetService ) {
  }

  ngOnInit() {
    this._getCurrentPet();
    this.speciesList = [
      {
        name: 'Myszoskoczek',
        rawName: 'gerbil'
      },
      {
        name: 'Chomik syryjski',
        rawName: 'syrian-hamster'
      },
      {
        name: 'Chomik karłowaty',
        rawName: 'dwarf-hamster'
      }
    ];
  }

  setPet(species: Pet) {
    this._pet.currentPet = species;
    this._getCurrentPet();
  }

  private _getCurrentPet(): void {
    this.selectedPet = this._pet.currentPet;
  }
}