import { Component, OnInit } from '@angular/core';
import { JSONDataService } from '../services/json-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  //
  // PROPERTIES
  //
  socialDataLinks = null;

  constructor(private _jsonDataService: JSONDataService) {

  }

  ngOnInit() {
  }

  getSocialDataLinks() {
    const jsonData = this._jsonDataService.getJsonData();
    if (jsonData) {
      return jsonData.userData.social;
    }

    return null;
  }

}
