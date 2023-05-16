import IPlayer from '../../interfaces/IPlayer';
import './style.css';

interface Props {
    player: IPlayer,
}
export default function PlayerCard({ player } : Props){
    return (
        <div className="player-card">
            <img src={player.photo} alt="" />
            <div className="information">
                <h5 className="name">
                    {player.name}
                </h5>
                <small className="details">
                    {player.age} anos - {player.nationality}
                </small>
            </div>
        </div>
    );
}