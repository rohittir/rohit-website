import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';

import { Covid19DataService } from '../services/covid19.service';

@Component({
    selector: 'app-country-wise',
    templateUrl: './country-wise.component.html'
})
export class CountryWiseComponent implements OnInit {
    public country: string;
    public covid19Data = [];
    public expand = {};

    constructor(private _route: ActivatedRoute, private _covid19Service: Covid19DataService) { }

    ngOnInit() {
        this._route.params.subscribe(params => {
            this.country = params['countryName'].toUpperCase();
            if (this.country) {
                let serviceCall = null;
                if (this.country === 'INDIA') {
                    serviceCall = this._covid19Service.getAllIndiaCases();
                } else if (this.country === 'USA') {
                    serviceCall = this._covid19Service.getAllUSCases();
                }

                if (serviceCall) {
                    serviceCall.pipe(
                        catchError((err: any) => {
                            console.error(err);
                            return err;
                        })
                    ).subscribe((res: any) => {
                        if (this.country === 'INDIA') {
                            this.covid19Data = this.getIndiaCasesData(res);
                        } else {
                            this.covid19Data = res;
                        }
                    });
                }
            }
        });
    }

    getIndiaCasesData = (data: any) => {
        return Object.keys(data).map((key) => ({
            state: key,
            districts: Object.keys(data[key].districtData).map((distKey) => ({
                name: distKey,
                cases: data[key].districtData[distKey].confirmed + data[key].districtData[distKey].delta.confirmed,
                deaths: data[key].districtData[distKey].deceased + data[key].districtData[distKey].delta.deceased,
                active: data[key].districtData[distKey].active,
                recovered: data[key].districtData[distKey].recovered + data[key].districtData[distKey].delta.recovered,
            })),
        }));
    }

    onExpand = (state: string) => {
        this.expand[state.toLowerCase()] = this.expand[state.toLowerCase()] ? false : true;
    }

}
