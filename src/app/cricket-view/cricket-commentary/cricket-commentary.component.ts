/**
 * class: CricketCommentaryComponent
 * Directory: src/app/cricket-view/cricket-commentary
 * @author Rohit Tirmanwar
 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { CricBuzzDataService } from '../services/cricbuzz-data.service';

@Component({
  selector: 'app-cricket-commentary',
  templateUrl: './cricket-commentary.component.html'
})
export class CricketCommentaryComponent implements OnInit, OnDestroy {

  //
  // PROPERTIES
  //
  public matchId = null;
  public selectedCommentary = null;
  public selectedTab = 'Commentary';
  public dataFetchInterval = null;

  //
  // LIFECYCLE
  //
  constructor(private _route: ActivatedRoute, public _cricbuzzDataService: CricBuzzDataService) {

  }


  ngOnInit() {
    this._route.params.subscribe(params => {
      this.matchId = params['matchId'];
      if (this.matchId) {
        this.initData();

        // refresh data in 1 min interval
        this.dataFetchInterval = setInterval(this.initData.bind(this), 60000);
      }
    });
  }

  ngOnDestroy() {
    if (this.dataFetchInterval) {
      clearInterval(this.dataFetchInterval);
      this.dataFetchInterval = null;
    }
  }

  private initData() {
    this._cricbuzzDataService.getMatchCommentary(this.matchId)
      .pipe(
        catchError((err: any) => {
          console.error(err);
          return err;
        })
      ).subscribe((res: any) => {
        // console.error('ROHIT::commentary:::', res);
        this.selectedCommentary = res;
      });

  }

  private convertGMTtoLocalTime(gmtTime: string) {
    const time = gmtTime.split(':');
    if (time.length === 2) {
      const gmtTimeMin = Math.floor(parseInt(time[0], 10) * 60) + Math.floor(parseInt(time[1], 10));
      const offset = new Date().getTimezoneOffset();
      const localTimeMin = gmtTimeMin - offset;

      if (localTimeMin < 0 || localTimeMin > (60 * 24)) {
        return gmtTime + ' Hrs GMT';
      }

      let localHours = Math.floor(localTimeMin / 60);
      const localMins = Math.floor(localTimeMin % 60);
      let timeDay = 'AM';
      if (localHours >= 12) {
        localHours = localHours - 12;
        timeDay = 'PM';
      }
      if (localHours === 0) {
        localHours = 12;
      }

      const hours = (localHours < 10) ? ('0' + localHours) : localHours;
      const mins = (localMins < 10) ? ('0' + localMins) : localMins;

      return (hours + ':' + mins + ' ' + timeDay);
    }
  }

}
