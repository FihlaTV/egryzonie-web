import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public speciesList: any[];

  constructor() {

  }

  ngOnInit() {
    this.speciesList = [
      {
        name: 'Myszoskoczek',
        rawName: 'gerbil'
      },
      {
        name: 'Chomik Syryjski',
        rawName: 'syrian-hamster'
      },
      {
        name: 'Chomik karłowaty',
        rawName: 'dwarf-hamster'
      },
      {
        name: 'Szczur',
        rawName: 'rat'
      },
      {
        name: 'Świnka morska',
        rawName: 'guinea-pig'
      }
    ];
  }
}