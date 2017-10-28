import { Injectable } from '@angular/core';
import { Pet } from '@interfaces/pet';

@Injectable()
export class PetService {
  private _currentPet: Pet;
  private _allowedPets: Pet[] = [
    { name: 'Myszoskoczek' },
    { name: 'Chomik syryjski' },
    { name: 'Chomik karłowaty' }
  ];

  constructor() {
    if (localStorage.selectedPet) {
      this._currentPet = JSON.parse(localStorage.selectedPet);
    }
  }

  set currentPet(pet: Pet) {
    const newPet = this._allowedPets.find((a) => a.name === pet.name);
    this._currentPet = newPet ? newPet : null;
    localStorage.selectedPet = JSON.stringify(this._currentPet);
  }

  get currentPet(): Pet {
    return this._currentPet || null;
  }

  allowedPets(): Pet[] {
    return this._allowedPets;
  }
}