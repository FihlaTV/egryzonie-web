import { Component, OnInit, Input } from '@angular/core';
import { User } from '@interfaces/user';

@Component({
  selector: 'eg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() public currentUser: User;
  public mainNavigation = [
    {
      path: '/',
      name: 'Strona główna'
    },
    {
      path: '/vets',
      name: 'Weterynarze'
    }
  ];

  constructor () {}

  ngOnInit() {

  }
}