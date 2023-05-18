import ILeague from '../../interfaces/ILeague';
import './style.css';

interface Props {
    league: ILeague,
    onClick: () => void
}
export default function LeagueCard({ league, onClick } : Props){
    return (
        <div className="league-card" onClick={onClick}>
            <img src={league.logo} alt="" />
            <h5 className="title">
                {league.name}
            </h5>
        </div>
    );
}