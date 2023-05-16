import IFixtures from "./IFixtures";
import IMinuteGoal from "./IMinuteGoal";
import ILineup from "./ILineup";

export default interface IStatistics {
    lineups: ILineup[],
    fixtures: IFixtures,
    minuteGoals: IMinuteGoal[]
}