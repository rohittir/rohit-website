/**
 * class: CricketScorecardComponent
 * Directory: src/app/cricket-view/cricket-scorecard
 * @author Rohit Tirmanwar
 */


import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { CricBuzzDataService } from '../services/cricbuzz-data.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-cricket-scorecard',
  templateUrl: './cricket-scorecard.component.html'
})
export class CricketScorecardComponent implements OnInit, OnChanges {

    //
    // INPUTS
    //
    @Input() public matchId = null;
    @Input() public isSquad = false;

    //
    // PROPERTIES
    //
    public scoreCard = null;
    public players = null;
    public teamSquads = [];

    //
    // LIFECYCLE
    //
    constructor(public _cricbuzzDataService: CricBuzzDataService) {

    }


    ngOnInit() {
        this.initData();
    }

    ngOnChanges() {
        this.initData();
    }

    private initData() {
        if (!this.matchId) {
            return;
        }

        forkJoin(
            this._cricbuzzDataService.getMatchScorecard(this.matchId),
            this._cricbuzzDataService.getMatchPlayers(this.matchId)
        )
        .pipe(
            catchError((err1: any) => {
                console.error(err1);
                return err1;
            })
        )
        .subscribe((res: any) => {
            this.scoreCard = res[0];
            this.players = res[1];
            this.initSquad();
        });
    }

    private initSquad() {
        if (this.players.team1 && this.players.team2) {
           this.teamSquads = [{
               teamName : this.players.team1.name,
               teamSquad : [],
               teamBench: []
            }, {
                teamName : this.players.team2.name,
                teamSquad : [],
                teamBench: []
            }];
            if (this.players.team1.squad) {
                for (let i = 0; i < this.players.team1.squad.length; i++) {
                    this.teamSquads[0].teamSquad.push(this.getPlayerName(this.players.team1.squad[i]));
                }
            }
            if (this.players.team2.squad) {
                for (let i = 0; i < this.players.team2.squad.length; i++) {
                    this.teamSquads[1].teamSquad.push(this.getPlayerName(this.players.team2.squad[i]));
                }
            }
            if (this.players.team1.squad_bench) {
                for (let i = 0; i < this.players.team1.squad_bench.length; i++) {
                    this.teamSquads[0].teamBench.push(this.getPlayerName(this.players.team1.squad_bench[i]));
                }
            }
            if (this.players.team1.squad_bench) {
                for (let i = 0; i < this.players.team2.squad_bench.length; i++) {
                    this.teamSquads[1].teamBench.push(this.getPlayerName(this.players.team2.squad_bench[i]));
                }
            }
        }

    }

    public getPlayerName(playerId: string): string {
        if (this.players && this.players.players) {
            const player = this.players.players.find((pl: any) => {
                return ('' + playerId === '' + pl.id);
            });
            if (player) {
                return player.f_name + (player.role ? player.role : '');
            }
        }
        return '';
    }

    public getStrikeRate(batsman: any): string {
        if (batsman) {
            const runs = parseInt(batsman.r, 10);
            const balls = parseInt(batsman.b, 10);

            if (balls <= 0) {
                return '-';
            }

            const rate = ((runs / balls) * 100);
            return rate.toFixed(2);
        }
    }

    public getEconomyRate(bowler: any): string {
        if (bowler) {
            const runs = parseInt(bowler.r, 10);
            const balls = (parseInt(bowler.o, 10) * 6) +
                (+bowler.o % 1);

            if (balls <= 0) {
                return '-';
            }

            const rate = parseInt('' + ((runs / balls) * 6), 10);
            return rate.toFixed(2);
        }
    }
}

