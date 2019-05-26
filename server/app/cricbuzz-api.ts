import http = require('http');
import https = require('https');
import express = require('express');
import fs = require('fs');
import AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'AKIAI4MS4CZDEHFHZLVQ',
    secretAccessKey: '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'
});
const bucket = 'personal-website-2.0';
const key = 'assets/cricbuzz-data';
const fetchInterval = 60 * 60 * 1000;

export class CricbuzzDataAPI {

    constructor(private app: express.Application) {
        this.applyEndPoints();
        this.extractDataToBuckets();
        setInterval(() => {
            this.extractDataToBuckets();
        }, fetchInterval);
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
        this.app.get('/api/cricbuzz-data/livematches', function (req, res) {
            try {
                _this.processGetRequest('http://cricbuzz-api-data.s3-website-us-east-1.amazonaws.com/livematches.json', req, res);
            } catch (e) {
                console.error('Exception: ' + e);
                res.status(500);
                res.send(null);
            }

        });

        this.app.get('/api/cricbuzz/players/:matchid', function (req, res) {
            try {
                _this.processPlayersGetRequest('https://www.cricbuzz.com/match-api/livematches.json', req, res);
            } catch (e) {
                console.error('Exception: ' + e);
                res.status(500);
                res.send(null);
            }

        });
        this.app.get('/api/cricbuzz-data/players/:matchid', function (req, res) {
            try {
                _this.processPlayersGetRequest('http://cricbuzz-api-data.s3-website-us-east-1.amazonaws.com/liveplayers.json', req, res);
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
        this.app.get('/api/cricbuzz/scorecard/:matchid', function (req, res) {
            try {
                _this.processGetRequest(`http://cricbuzz-api-data.s3-website-us-east-1.amazonaws.com/${req.params.matchid}-scorecard.json`, req, res);
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
        this.app.get('/api/cricbuzz/commentary/:matchid', function (req, res) {
            try {
                _this.processGetRequest(`http://cricbuzz-api-data.s3-website-us-east-1.amazonaws.com/${req.params.matchid}-commentary.json`, req, res);
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
        this.app.get('/api/cricbuzz/match/:matchid', function (req, res) {
            try {
                _this.processGetRequest(`http://cricbuzz-api-data.s3-website-us-east-1.amazonaws.com/${req.params.matchid}.json`, req, res);
            } catch (e) {
                console.error('Exception: ' + e);
                res.status(500);
                res.send(null);
            }

        });
    }

    private processPlayersGetRequest(url: string, req: any, res: any): void {
        https.get(url, (response) => {
            var completeResponse = '';
            response.on('data', function (chunk) {
                completeResponse += chunk;
            });
            response.on('end', function () {
                var data = JSON.parse(completeResponse);

                if (data.matches) {
                    console.log(req.params.matchid);
                    console.log(data.matches);
                    res.status(200);
                    res.send(data.matches[req.params.matchid]);
                } else {
                    res.status(500);
                    res.send(null);
                }
            })
        }).on('error', function (err) {
            res.status(500);
            res.send(null);
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

    private extractDataToBuckets(): void {
        console.log('Extracting data from API and writing to buckets....\n');

        this.writeDataToFile(
            'http://mapps.cricbuzz.com/cbzios/match/livematches',
            `${key}/livematches.json`
        );
        this.writePlayersDataToFile(
            'https://www.cricbuzz.com/match-api/livematches.json',
            key
        );
    }

    private extractMatchSpecificDataToBuckets(matchIdList: Array<string>): void {
        if (!matchIdList) {
            return;
        }

        matchIdList.forEach((matchId: string) => {
            this.writeDataToFile(
                `http://mapps.cricbuzz.com/cbzios/match/${matchId}/scorecard`,
                `${key}/${matchId}/scorecard.json`
            );

            this.writeDataToFile(
                `http://mapps.cricbuzz.com/cbzios/match/${matchId}/commentary`,
                `${key}/${matchId}/commentary.json`
            );

            this.writeDataToFile(
                `http://mapps.cricbuzz.com/cbzios/match/${matchId}`,
                `${key}/${matchId}/details.json`
            );

        });
    }

    private writeDataToFile(url: string, key: string): void {
        http.get(url, (response) => {
            var completeResponse = '';
            response.on('data', function (chunk) {
                completeResponse += chunk;
            });
            response.on('end', function () {
                const params = {
                    Bucket: bucket,
                    ACL:'public-read',
                    Key: key,
                    Body: completeResponse
                };
                s3.upload(params, function (err: any) {
                    if(err) {
                        console.error('ERROR:::::', err);
                    }
                });
            })
        }).on('error', function (err) {
            console.error('ERROR:::::', err);
        });
    }

    private writePlayersDataToFile(url: string, key: string): void {
        const _that = this;
        https.get(url, (response) => {
            var completeResponse = '';
            response.on('data', function (chunk) {
                completeResponse += chunk;
            });
            response.on('end', function () {
                var data = JSON.parse(completeResponse);
                const matchIdList: Array<string> = [];
                Object.keys(data.matches).forEach( (matchId: string) => {
                    matchIdList.push(matchId);
                    const params = {
                        Bucket: bucket,
                        ACL:'public-read',
                        Key: `${key}/${matchId}/players.json`,
                        Body: JSON.stringify(data.matches[matchId])
                    };
                    s3.upload(params, function (err: any) {
                        if(err) {
                            console.error('ERROR:::::', err);
                        }
                    });
                });

                _that.extractMatchSpecificDataToBuckets(matchIdList);
            })
        }).on('error', function (err) {
            console.error('ERROR:::::', err);
        });
    }
}
