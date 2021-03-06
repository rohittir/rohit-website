/**
 * class: SearchService
 * Directory: src/app/services
 * @author Rohit Tirmanwar
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class JSONDataService {


    //
    // DATA
    //
    userProfileData = null;

    constructor(private _http: HttpClient) {
    }

    //
    // OPERATIONS
    //

    public readUserProfileDataFromJson(): Observable<any> {
        const fileName = 'assets/data/user-profile.json';
        return this._http.get(fileName);
    }

    public readUserTimelineFromJson(): Observable<any> {
        const fileName = 'assets/data/user-timeline.json';
        return this._http.get(fileName);
    }

    public readInspirationsDataFromJson(): Observable<any> {
        const fileName = 'assets/data/inspirations-data.json';
        return this._http.get(fileName);
    }

    // public fetchUserData(): Observable<any> {
    //     return this._http.get(this._serverConfigService.serverUrl + '/api/profile/');
    // }

    // public fetchUserTimelineData(): Observable<any> {
    //     return this._http.get(this._serverConfigService.serverUrl + '/api/profile/timeline/');
    // }

    // public fetchCurrentInspiration(): Observable<any> {
    //     return this._http.get(this._serverConfigService.serverUrl + '/api/inspiration/');
    // }


    //
    // GETTERS and SETTERS
    //
    setJsonData(data) {
        this.userProfileData = data;
    }
    getJsonData() {
        return this.userProfileData;
    }
}
