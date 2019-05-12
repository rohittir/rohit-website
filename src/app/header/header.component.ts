import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JSONDataService } from '../services/json-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _router: Router, private _jsonDataService: JSONDataService) { }

  ngOnInit() {
  }

  //
    // OPERATIONS
    //

    isActive(routeAddress: string) {
      return this._router.url === routeAddress;
  }

  isSubMenuActive(routes: Array<string>) {
      for (let i = 0; i < routes.length; i++) {
          if (this._router.url === routes[i]) {
              return true;
          }
      }

      return false;
  }

  getHeaading(): string {
      const data = this._jsonDataService.getJsonData();
      if (data) {
          return data.userData.profile.name;
      }

      return 'Rohit Tirmanwar';
  }


  //
  // EVENTS
  //

  onSearch() {

  }

}
