import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Covid19Component } from './covid19.component';
import { Covid19DataService } from './services/covid19.service';
import { SharedModule } from '../shared';

@NgModule({
    declarations: [
        Covid19Component,
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
        ])
    ],
    providers: [
        Covid19DataService
    ]
  })
  export class Covid19Module { }
