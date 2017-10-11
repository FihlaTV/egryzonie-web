import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserService, GeolocationService } from '@services/index';
import { User } from '@interfaces/user';
import { Subscription } from 'rxjs/Subscription';

import { VetsService } from '../vets.service';

@Component({
  selector: 'eg-vets-list',
  templateUrl: './vets-list.component.html',
  styleUrls: ['./vets-list.component.scss']
})
export class VetsListComponent implements OnInit {
  
  public userPosition: Position;
  public currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  public vetsList: any[] = [];
  
  private _geoSub: Subscription;

  constructor(
    private _user: UserService,
    private _geo: GeolocationService,
    private _vets: VetsService
  ) { }

  ngOnInit() {
    this.currentUser$ = this._user.currentUser$;
    this._geoSub = this._geo.getCurrentPosition()
      .subscribe((position) => {
        this.userPosition = position;
        this._loadNearbyVets()
          .then((results) => {
            this.vetsList = results;
          })
          .catch((error) => {
            console.error(error);
          });
      });
  }

  openMap(id: string) {
    window.location.href = `https://www.google.com/maps/place/?q=place_id:${id}`
  }

  view(id: string) {
    console.log('View vet ID: ', id);
  }

  private _loadNearbyVets(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const nearby = this._vets.getNearbyVets(this.userPosition)
        .subscribe(
          (googleResults) => {
            const places = googleResults.map((item) => item.title);
            const saved = this._vets.getSavedVets(places)
              .subscribe((savedResults) => {
                const filtered = this._filterRecommended(googleResults, savedResults);
                resolve(filtered);
              });
          (error) => {
            reject(error);
          }
        });
    });
  }

  private _filterRecommended(found: any[], saved: any[]): any[] {
    return found.map((f) => {
        const search = saved.find((s) => {
          return s.name === f.name && s.address === f.address;
        });
        f.recommended = !!search;
        return f;
      }).sort((a, b) => {
        if (!a['recommended'] && b['recommended']) {
          return 1;
        }
        if (a['recommended'] && b['recommended']) {
          return 0;
        }
        if (a['recommended'] && !b['recommended']) {
          return -1;
        }
      });
  }

}