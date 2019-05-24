

/**
 * class: ProfileDetailsComponent
 * Directory: src/app/profile-page/profile-details
 * @author Rohit Tirmanwar
 */


import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JSONDataService } from '../../services/json-data.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {


  //
  // PROPERTIES
  //
  public profileLabel = null;
  public industryInfo = null;

  //
  // LIFECYCLE
  //
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _jsonDataService: JSONDataService) {
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.profileLabel = params['detailsLabel'];
      if (this.profileLabel) {
        const jsonData = this._jsonDataService.getJsonData();
        if (!jsonData) {
          this._jsonDataService.readUserProfileDataFromJson()
              .pipe(
                  catchError((err1: any) => {
                      console.error(err1);
                      return err1;
                  })
              ).subscribe((res1: any) => {
                  this.initData(res1);
                  this._jsonDataService.setJsonData(res1);
              });
        } else {
          this.initData(jsonData);
        }
        window.scrollTo(0, 0);
      }
    });

  }

  private initData(jsonData: any): any {

    if (jsonData) {
      const industries = jsonData.userData.experience.industries;
      for (let i = 0; i < industries.length; i++) {
        if (industries[i].label === this.profileLabel) {
          this.industryInfo = industries[i];
          break;
        }
      }

    }
  }

  public handleBackClick() {
    this._router.navigate(['/profile']);
  }

}
