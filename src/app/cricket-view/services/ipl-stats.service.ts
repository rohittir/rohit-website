/**
 * class: LiveScoreService
 * Directory: src/app/cricket-view
 * @author Rohit Tirmanwar
 */


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { SERVER_CONFIG } from 'application-config/server-config';

@Injectable()
export class IPLStatsService {

    private serverUrl = SERVER_CONFIG().host + ':' + SERVER_CONFIG().port;

    constructor(private _http: HttpClient) {}

    //
    // OPERATIONS
    //

    // fetch the ipl stats data
    public fetchIPLStats(index): Observable<any> {
        return this._http.get(this.serverUrl
            + '/api/cricket/ipl2018/stats/' + index);
    }

     // fetch the ipl schedule
     public fetchIPLSchedule(): Observable<any> {
        return this._http.get(this.serverUrl
            + '/api/cricket/ipl2018/schedule/');
    }
}
