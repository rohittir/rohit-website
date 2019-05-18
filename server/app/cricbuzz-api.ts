import http = require('http');
import https = require('https');
import express = require('express');

export class CricbuzzDataAPI {
    constructor(private app: express.Application) {
        this.applyEndPoints();
    }

    private applyEndPoints() {
        const _this = this;
        this.app.get('/api/cricbuzz/livematches', function (req, res) {
            try {
                _this.processGetRequest('http://mapps.cricbuzz.com/cbzios/match/livematches', req, res);
            } catch (e) {
                console.error('Exception: ' + e);
                res.status(500);
                res.send(null);
            }

        });

        this.app.get('/api/cricbuzz/scorecard/:matchid', function (req, res) {
            try {
                _this.processGetRequest(`http://mapps.cricbuzz.com/cbzios/match/${req.params.matchid}/scorecard`, req, res);
            } catch (e) {
                console.error('Exception: ' + e);
                res.status(500);
                res.send(null);
            }

        });

        this.app.get('/api/cricbuzz/commentary/:matchid', function (req, res) {
            try {
                _this.processGetRequest(`http://mapps.cricbuzz.com/cbzios/match/${req.params.matchid}/commentary`, req, res);
            } catch (e) {
                console.error('Exception: ' + e);
                res.status(500);
                res.send(null);
            }

        });

        this.app.get('/api/cricbuzz/match/:matchid', function (req, res) {
            try {
                _this.processGetRequest(`http://mapps.cricbuzz.com/cbzios/match/${req.params.matchid}`, req, res);
            } catch (e) {
                console.error('Exception: ' + e);
                res.status(500);
                res.send(null);
            }

        });
    }

    private processGetRequest(url: string, req: any, res: any): void {
        http.get(url, (response) => {
            var completeResponse = '';
            response.on('data', function (chunk) {
                completeResponse += chunk;
            });
            response.on('end', function () {
                var data = JSON.parse(completeResponse);
                res.status(200);
                res.send(data);
            })
        }).on('error', function (err) {
            res.status(500);
            res.send(null);
        });
    }
}
