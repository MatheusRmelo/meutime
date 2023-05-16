import './style.css';

interface Props {
    title: string,
    value: string
}
export default function InformationCard({ title, value } : Props){
    return (
        <div className="information-card">
            <h5 className="title">
                {title}
            </h5>
            <small className='value'>{value}</small>
        </div>
    );
}