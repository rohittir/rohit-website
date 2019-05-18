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
export class LiveScoreService {
    private serverUrl = SERVER_CONFIG().host + ':' + SERVER_CONFIG().port;

    constructor(private _http: HttpClient) {}

    //
    // OPERATIONS
    //

    public fetchLiveMatches(): Observable<any> {
        return this._http.get(this.serverUrl
            + '/api/cricket/livecricscore/csLiveMatches/');
    }

    public fetchLiveScore(matchId: string): Observable<any> {
        return this._http.get(this.serverUrl
            + '/api/cricket/livecricscore/csLiveScore/?matchId=' + matchId);
    }

    public fetchCurrentMatches(): Observable<any> {
        return this._http.get(this.serverUrl
            + '/api/cricket/cbLiveMatches/');
    }

    // fetch the scorecard
    public fetchMatchScorecard(matchUrl: string): Observable<any> {
        return this._http.get(this.serverUrl
            + '/api/cricket/cbScorecard/?matchUrl=' + matchUrl);
    }

    // fetch the commentary
    public fetchMatchCommentary(matchUrl: string): Observable<any> {
        return this._http.get(this.serverUrl
            + '/api/cricket/cbCommentary/?matchUrl=' + matchUrl);
    }

    // fetch the news headlines
    public fetchCricketHeadlines(): Observable<any> {
        return this._http.get(this.serverUrl
            + '/api/cricket/cricnews/top-headlines/');
    }

     // fetch the news headlines
    public fetchCricketNews(): Observable<any> {
        return this._http.get(this.serverUrl
            + '/api/cricket/cricnews/everything/');
    }

}

