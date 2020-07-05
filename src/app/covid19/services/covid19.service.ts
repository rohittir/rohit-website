import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class Covid19DataService {

    private serverUrl = 'https://dmdk51ksqe.execute-api.us-east-1.amazonaws.com/';

    constructor(private _http: HttpClient) {
    }

    public getAllCountryCases(): Observable<any> {
        return this._http.get(`${this.serverUrl}/countries`);
    }
}
