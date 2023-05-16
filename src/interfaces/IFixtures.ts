export default interface IFixtures {
    draws: ILocal,
    loses: ILocal,
    played: ILocal,
    wins: ILocal,
}

interface ILocal {
    away: number,
    home: number,
    total: number,
}