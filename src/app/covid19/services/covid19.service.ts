import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class Covid19DataService {

    private serverUrl = 'https://corona.lmao.ninja/v2';

    constructor(private _http: HttpClient) {
    }

    public getAllCountryCases(): Observable<any> {
        return this._http.get(`https://coronavirus-19-api.herokuapp.com/countries`);
    }

    public getCountryCases(country: string): Observable<any> {
        return this._http.get(`${this.serverUrl}/countries/${country}?strict=true&query`);
    }

    public getAllUSCases(): Observable<any> {
        return this._http.get(`${this.serverUrl}/states?sort=true`);
    }

    public getAllIndiaCases(): Observable<any> {
        return this._http.get(`https://api.covid19india.org/state_district_wise.json`);
    }

    public getAllContinentCases(): Observable<any> {
        return this._http.get(`${this.serverUrl}/continents?sort=true`);
    }

    public getContinentCases(continent: string): Observable<any> {
        return this._http.get(`${this.serverUrl}/continents/${continent}?strict=true`);
    }
}
