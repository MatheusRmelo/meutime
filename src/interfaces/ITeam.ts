export default interface ITeam {
    id: number,
    name: string,
    code: string|null,
    country: string,
    founded: number|null,
    national: boolean,
    logo: string,

    hidden?: boolean
}