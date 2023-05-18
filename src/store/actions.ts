import ICountry from '../interfaces/ICountry';
import ILeague from '../interfaces/ILeague';
import ITeam from '../interfaces/ITeam';
import * as actionTypes from './actions.types';
import { AppAction } from './type';

export function updateApiKey(key: string){
    const action: AppAction = {
        type: actionTypes.UPDATE_API_KEY,
        key,
    }

    return action;
}
export function updateSeasonAndCountry(country: ICountry, season: number){
    const action: AppAction = {
        type: actionTypes.UPDATE_SEASON_AND_COUNTRY,
        country,
        season,
    }

    return action;
}
export function updateLeague(league: ILeague){
    const action: AppAction = {
        type: actionTypes.UPDATE_LEAGUE,
        league
    }

    return action;
}

export function updateTeam(team: ITeam){
    const action: AppAction = {
        type: actionTypes.UPDATE_TEAM,
        team
    }

    return action;
}