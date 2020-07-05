import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { Covid19DataService } from './services/covid19.service';

@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.scss']
})
export class Covid19Component implements OnInit {

  public covid19Data = [];

  constructor(private _covid19Service: Covid19DataService) { }

  ngOnInit() {
    this._covid19Service.getAllCountryCases()
      .pipe(
        catchError((err: any) => {
          console.error(err);
          return err;
        })
      ).subscribe((res: any) => {
        this.covid19Data = res;
      });
  }

}
