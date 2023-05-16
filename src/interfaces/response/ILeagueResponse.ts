import ICountry from "../ICountry";
import ILeague from "../ILeague";
import ISeason from "../ISeason";

export default interface ILeagueResponse {
    league: ILeague,
    country: ICountry,
    season: ISeason[],
}