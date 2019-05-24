


/**
 * class: ProfilePageComponent
 * Directory: src/app/profile-page
 * @author Rohit Tirmanwar
 */

import { Component, OnInit } from '@angular/core';
import { JSONDataService } from '../services/json-data.service';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {


    //
    // PROPERTIES
    //
    public jsonData = null;
    public profile = null;
    public skillList = null;
    public schoolList = null;
    public industryList = null;
    public academicProjectList = null;
    //
    // LIFECYCLE
    //
    constructor(
        private _jsonDataService: JSONDataService,
        private _router: Router) {

    }

    ngOnInit() {
        this.initData();
    }

    //
    // OPERATIONS
    //

    private initData(): void {
        this.jsonData = this._jsonDataService.getJsonData();
        if (!this.jsonData) {
            this._jsonDataService.readUserProfileDataFromJson()
                .pipe(
                    catchError((err1: any) => {
                        console.error(err1);
                        return err1;
                    })
                )
                .subscribe(res1 => {
                    this.jsonData = res1;
                    this._jsonDataService.setJsonData(this.jsonData);
                    this.populateUserJSONData();
                });
        } else {
            this.populateUserJSONData();
        }
    }

    private populateUserJSONData(): void {
        this.profile = this.jsonData.userData.profile;
        this.skillList = this.jsonData.userData.skills.keywords;
        this.schoolList = this.jsonData.userData.education.schools;
        this.industryList = this.jsonData.userData.experience.industries;
        this.academicProjectList = this.jsonData.userData.academic.projects;
    }

    public handleExperienceClick(industryLabel: string): void {
        this._router.navigate([`/profile/${industryLabel}`]);
    }

}
