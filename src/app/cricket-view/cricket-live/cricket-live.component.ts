/**
 * class: CricketLiveComponent
 * Directory: src/app/cricket-view/cricket-live
 * @author Rohit Tirmanwar
 */


import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CricBuzzDataService } from '../services/cricbuzz-data.service';
import {
  MatchTypeDetails,
  PlayerDetails,
  MatchSummary,
  MatchDetails
} from '../interfaces/cricket-live.interface';

@Component({
  selector: 'app-cricket-live',
  templateUrl: './cricket-live.component.html'
})
export class CricketLiveComponent implements OnInit, OnDestroy {
  //
  // PROPERTIES
  //
  public liveCricketData: MatchDetails[];
  public matchTypesData: MatchTypeDetails[];

  public matchesList = null;
  public selectedMatchInfo = null;
  public showLive = false;
  public dataFetchInterval = null;

  constructor(
    public _cricbuzzDataService: CricBuzzDataService,
    public _router: Router
  ) { }

  ngOnInit() {
    this.refreshMatches();
    // refresh data in 1 min interval
    this.dataFetchInterval = setInterval(this.refreshMatches.bind(this), 60000);
  }

  ngOnDestroy() {
    if (this.dataFetchInterval) {
      clearInterval(this.dataFetchInterval);
      this.dataFetchInterval = null;
    }
  }

  //
  // OPERATIONS
  //
  private refreshMatches() {
    // Fetch Live scores
    this._cricbuzzDataService.getAllMatches()
      .pipe(
        catchError((err: any) => {
          console.error(err);
          return err;
        })
      ).subscribe((res: any) => {
        this.mapApiDataToLiveData(res);
        // console.error('ROHIT:::matchesList:::', this.liveCricketData);
    });
  }

  private mapApiDataToLiveData(res: any): void {
    this.matchTypesData = [];
    if (res.srs_category) {
      res.srs_category.forEach((srs_cat: any) => {
        this.matchTypesData.push({
          matchType: srs_cat.id,
          matchTypeDesc: srs_cat.title
        });
      });
    }

    this.liveCricketData = [];
    if (res.matches) {
      res.matches.forEach((match: any) => {
        this.liveCricketData.push({
          matchId: match.match_id,
          matchType: this.getMatchTypes(match.srs_category),
          matchDesc: match.header.match_desc,
          type: match.header.type,
          matchTitle: match.team1.s_name + ' vs ' + match.team2.s_name,
          series: {
            seriesId: match.series_id,
            name: match.series_name,
          },
          venue: {
            location: match.venue.location,
            name: match.venue.name
          },
          team1: {
            teamId: match.team1.id,
            name: match.team1.name,
            shortName: match.team1.s_name,
            flag: match.team1.flag
          },
          team2: {
            teamId: match.team2.id,
            name: match.team2.name,
            shortName: match.team2.s_name,
            flag: match.team2.flag
          },
          startTime: match.header.start_time,
          endTime: match.header.end_time,
          status: match.header.status,
          toss: match.header.toss,
          mom: this.getMOMData(match),
          matchSummary: this.getMatchSummary(match)
        });
      });
    }
  }

  private getMatchSummary(match: any): MatchSummary {
    let summary: MatchSummary = null;
    if (match.bat_team) {
      summary = {
        battingTeam: {
          name: match.bat_team.id === match.team1.id ? match.team1.name : match.team2.name,
          batsmen: match.batsman.filter((batsman: any) => {
            return {
              playerId: batsman.id,
              name: batsman.name,
              strike: batsman.strike,
              runs: batsman.r,
              balls: batsman.b,
              fours: batsman['4s'],
              sixes: batsman['6s']
            };
          }),
          innings: match.bat_team.innings.map((inning: any) => {
            return {
              overs: inning.overs,
              score: inning.score,
              wickets: inning.wkts
            };
          })
        },

        bowlingTeam: {
          name: match.bow_team.id === match.team1.id ? match.team1.name : match.team2.name,
          bowlers: match.bowler.filter((bowler: any) => {
            return {
              playerId: bowler.id,
              name: bowler.name,
              overs: bowler.o,
              maiden: bowler.m,
              runs: bowler.r,
              wickets: bowler.w
            };
          }),
          innings: match.bow_team.innings.map((inning: any) => {
            return {
              overs: inning.overs,
              score: inning.score,
              wickets: inning.wkts
            };
          })
        },
      };
    }
    return summary;
  }

  private getMOMData(match: any): PlayerDetails[] {
    const data: PlayerDetails[] = [];
    if (match.header.momNames) {
      match.header.momNames.forEach((mom: any) => {
        data.push({
          name: mom
        });
      });
    }
    return data;
  }

  private getMatchTypes(categories: any[]): MatchTypeDetails[] {
    const data: MatchTypeDetails[] = [];
    categories.forEach((cat: any) => {
      const mType = this.matchTypesData.find((m: MatchTypeDetails) => {
        return m.matchType === cat;
      });
      if (mType) {
        data.push(mType);
      }
    });
    return data;
  }

  //
  // EVENTS
  //
  public showMatchInfo(match: MatchDetails): void {
    if (match.matchId) {
      this._router.navigate(['/cricket/livecommentary/' + match.matchId]);
    }
  }
}



