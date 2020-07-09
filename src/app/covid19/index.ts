import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Covid19Component } from './covid19.component';
import { Covid19DataService } from './services/covid19.service';
import { CountryWiseComponent } from './country-wise/country-wise.component';
import { SharedModule } from '../shared';

@NgModule({
    declarations: [
        Covid19Component,
        CountryWiseComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        RouterModule.forChild([
            {
                path: '',
                component: Covid19Component
            },
            {
                path: 'country/:countryName',
                component: CountryWiseComponent
            }
        ])
    ],
    providers: [
        Covid19DataService
    ]
  })
  export class Covid19Module { }
