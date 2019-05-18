export interface LiveCricketDetails {
    [matchId: string]: MatchDetails;
}

export interface MatchTypeDetails {
    matchType: string;
    matchTypeDesc: string;
}

export interface MatchDetails {
    matchId: string;
    matchType: MatchTypeDetails[];
    type: string;
    matchTitle: string;
    series: SeriesDetails;
    matchDesc?: string;
    venue: VenueDetails;
    team1: TeamDetails;
    team2: TeamDetails;
    startTime: string;
    endTime: string;
    status: string;
    toss: string;
    mom: PlayerDetails[];
    matchSummary: MatchSummary;
}

export interface VenueDetails {
    name: string;
    location: string;
}

export interface SeriesDetails {
    name: string;
    seriesId: string;
}

export interface TeamDetails {
    teamId: string;
    name: string;
    shortName: string;
    flag: string;
}

export interface MatchSummary {
    battingTeam: {
        name: string;
        batsmen: BatsmenDetails[];
        innings: InningsDetails[];
    };
    bowlingTeam: {
        name: string;
        bowlers: BowlerDetails[];
        innings: InningsDetails[];
    };
}

export interface InningsDetails {
    overs: string;
    score: string;
    wickets: string;
}

export interface BatsmenDetails {
    playerId: string;
    name: string;
    strike: boolean;
    runs: string;
    balls: string;
    fours: string;
    sixes: string;
}

export interface BowlerDetails {
    playerId: string;
    name: string;
    overs: string;
    runs: string;
    wickets: string;
    maiden: string;
}

export interface PlayerDetails {
    playerId?: string;
    name: string;
}
