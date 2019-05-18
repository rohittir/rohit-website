import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { SERVER_CONFIG } from 'application-config/server-config';

@Injectable()
export class CricBuzzDataService {

    private serverUrl = SERVER_CONFIG().host + ':' + SERVER_CONFIG().port;

    constructor(private _http: HttpClient) {}

    public getAllMatches(): Observable<any> {
        console.error('_serverConfigService.serverUrl:::', this.serverUrl);
        return this._http.get(`${this.serverUrl}/api/cricbuzz/livematches`);
    }

    public getMatchDetails(matchId: string): Observable<any> {
        return this._http.get(`${this.serverUrl}/api/cricbuzz/match/${matchId}`);
    }

    public getMatchScorecard(matchId: string): Observable<any> {
        return this._http.get(`${this.serverUrl}/api/cricbuzz/scorecard/${matchId}`);
    }

    public getMatchCommentary(matchId: string): Observable<any> {
        return this._http.get(`${this.serverUrl}/api/cricbuzz/commentary/${matchId}`);
    }

    public getMatchPlayers(matchId: string): Observable<any> {
        return this._http.get(`${this.serverUrl}/api/cricbuzz/players/${matchId}`);
    }


}
