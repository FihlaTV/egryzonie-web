import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@interfaces/user';

@Component({
  selector: 'eg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() public currentUser: User;

  public navbarVisible: boolean = false;
  public navigationLinks: any[] = [
    { name: 'Misja', route: null },
    { name: 'Gryzonie', route: '/' },
    { name: 'Weterynarze', route: '/vets' },
    { name: 'Adopcja', route: null },
    { name: 'Zakupy', route: null },
    { name: 'Kontakt', route: null }
  ];

  constructor( private _router: Router ) { }
  ngOnInit() {}

  toggleNavbar() {
    this.navbarVisible = !this.navbarVisible;
    this._toggleBodyLock();
  }

  handleClick(link: any): void {
    if (link.route === null) {
      window.alert('Jeszcze nie działa!!!');
    } else {
      this._router.navigate([link.route]);
    }
    this.toggleNavbar();
  }

  private _toggleBodyLock() {
    if (this.navbarVisible) {
      document.getElementsByTagName('body')[0].classList.add('locked');
    } else {
      document.getElementsByTagName('body')[0].classList.remove('locked');
    }
  }
}