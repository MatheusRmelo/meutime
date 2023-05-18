import ICountry from "../interfaces/ICountry"
import ILeague from "../interfaces/ILeague"
import ITeam from "../interfaces/ITeam"

type AppState = {
    key: string,
    country: ICountry|null,
    season: number|null,
    league: ILeague|null,
    team: ITeam|null,
}

type AppAction = {
    type: string,
    key?: string,
    country?: ICountry,
    season?: number,
    league?: ILeague,
    team?: ITeam
}

type DispatchType = (args: AppAction) => AppAction