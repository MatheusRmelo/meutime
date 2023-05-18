import * as actionTypes from "./actions.types";
import { AppAction, AppState } from "./type";

const initialState: AppState = {
    key: '',
    country: null,
    season: null,
    league: null,
    team: null,
};

const reducer = (
    state: AppState = initialState,
    action: AppAction
  ): AppState => {
    switch (action.type) {
        case actionTypes.UPDATE_API_KEY:
            return {
                ...state,
                key: action.key ?? "",
            };
        case actionTypes.UPDATE_SEASON_AND_COUNTRY:
            return {
                ...state,
                country: action.country ?? null,
                season: action.season ?? null
            };
        case actionTypes.UPDATE_LEAGUE:
            return {
                ...state,
                league: action.league ?? null,
            };
        case actionTypes.UPDATE_TEAM:
            return {
                ...state,
                team: action.team ?? null,
            };
    }

    return state;
  }
  
  export default reducer;