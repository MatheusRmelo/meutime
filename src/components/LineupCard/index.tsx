import ILineup from '../../interfaces/ILineup';
import './style.css';

interface Props {
    lineup: ILineup,
}
export default function LineupCard({ lineup } : Props){
    return (
        <div className="lineup-card">
            <h5 className="title">
                {lineup.formation}
            </h5>
            <small className="details">
                {lineup.played} {lineup.played == 1 ? 'vez' : 'vezes'}
            </small>
        </div>
    );
}