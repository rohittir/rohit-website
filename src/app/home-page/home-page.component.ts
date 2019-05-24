
/**
 * class: HomePageComponent
 * Directory: src/app/home-page
 * @author Rohit Tirmanwar
 */


import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { JSONDataService } from '../services/json-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {


    //
    // PROPERTIES
    //
    userProfile = null;
    inspirationData = null;

    //
    // LIFECYCLE
    //
    constructor(private _jsonDataService: JSONDataService) {

    }


    ngOnInit() {
        this.initData();
    }


    //
    // OPERATIONS
    //
    initData() {
        const userProfile = this._jsonDataService.getJsonData();
        if (!userProfile) {
            this._jsonDataService.readUserProfileDataFromJson()
                .pipe(
                    catchError((err1: any) => {
                        console.error(err1);
                        return err1;
                    })
                ).subscribe((res1: any) => {
                    this.userProfile = res1.userData.profile;
                    this._jsonDataService.setJsonData(res1);
                });
        } else {
            this.userProfile = userProfile.userData.profile;
        }
    }
}

