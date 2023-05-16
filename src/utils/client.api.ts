import axios, { AxiosError, AxiosInstance } from "axios";
import ICountry from "../interfaces/ICountry";
import ILeague from "../interfaces/ILeague";
import ILeagueResponse from "../interfaces/response/ILeagueResponse";

export default class ClientAPI {
    private client: AxiosInstance;

    constructor(key:string){
        this.client = axios.create({
            baseURL: 'https://api-football-v1.p.rapidapi.com/v3/',
            headers: {
                'X-RapidAPI-Key': key,
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            }
        })
    }

    public async checkKey() : Promise<boolean> {
        return true;
        // try {
        //     await this.client.get('timezone');
        //     return true;
        // }catch(e){
        //     if(e instanceof AxiosError){
        //         if(e.response?.status == 401 || e.response?.status == 403) return false;
        //     }
        //     throw new DOMException("Failed server");
        // }
    }

    public async getCountries() : Promise<ICountry[]>{
        try {
            var result = await this.client.get('countries');
            return result.data.response;
        }catch(e){
            throw new DOMException("Failed server");
        }
    }

    public async getLeagues(country: ICountry, season: number) : Promise<ILeague[]>{
        try {
            var result = await this.client.get(`leagues?code=${country.code}&season=${season}`);
            let leagues: ILeague[] = [];
            (result.data.response as ILeagueResponse[]).forEach((element)=>{
                leagues.push(element.league);
            });
            return leagues;
        }catch(e){
            throw new DOMException("Failed server");
        }
    }
}