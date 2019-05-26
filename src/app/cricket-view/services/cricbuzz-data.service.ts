import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { SERVER_CONFIG } from 'application-config/server-config';

@Injectable()
export class CricBuzzDataService {

    private serverUrl = SERVER_CONFIG().host + ':' + SERVER_CONFIG().port;

    constructor(private _http: HttpClient) {
        console.log('SERVER_CONFIG:::', SERVER_CONFIG());
    }

    public getAllMatches(): Observable<any> {

        if (SERVER_CONFIG().isLocalFilesDataRead) {
            return this._http.get('assets/cricbuzz-data/livematches.json');
        } else {
            return this._http.get(`${this.serverUrl}/api/cricbuzz/livematches`);
        }
    }

    public getMatchDetails(matchId: string): Observable<any> {
        if (SERVER_CONFIG().isLocalFilesDataRead) {
            return this._http.get(`assets/cricbuzz-data/${matchId}/details.json`);
        } else {
            return this._http.get(`${this.serverUrl}/api/cricbuzz/match/${matchId}`);
        }
    }

    public getMatchScorecard(matchId: string): Observable<any> {
        if (SERVER_CONFIG().isLocalFilesDataRead) {
            return this._http.get(`assets/cricbuzz-data/${matchId}/scorecard.json`);
        } else {
            return this._http.get(`${this.serverUrl}/api/cricbuzz/scorecard/${matchId}`);
        }
    }

    public getMatchCommentary(matchId: string): Observable<any> {
        if (SERVER_CONFIG().isLocalFilesDataRead) {
            return this._http.get(`assets/cricbuzz-data/${matchId}/commentary.json`);
        } else {
            return this._http.get(`${this.serverUrl}/api/cricbuzz/commentary/${matchId}`);
        }
    }

    public getMatchPlayers(matchId: string): Observable<any> {
        if (SERVER_CONFIG().isLocalFilesDataRead) {
            return this._http.get(`assets/cricbuzz-data/${matchId}/players.json`);
        } else {
            return this._http.get(`${this.serverUrl}/api/cricbuzz/players/${matchId}`);
        }
    }

}
