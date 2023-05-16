import ILeague from '../../interfaces/ILeague';
import './style.css';

interface Props {
    league: ILeague,
}
export default function LeagueCard({ league } : Props){
    return (
        <div className="league-card">
            <img src={league.logo} alt="" />
            <h5 className="title">
                {league.name}
            </h5>
        </div>
    );
}