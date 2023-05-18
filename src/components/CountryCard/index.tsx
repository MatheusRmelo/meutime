import ICountry from '../../interfaces/ICountry';
import './style.css';

interface Props {
    country: ICountry,
    onClick: () => void
}
export default function CountryCard({ country, onClick } : Props){
    return (
        <div className="country-card" onClick={onClick}>
            <img src={country.flag} alt="" />
            <h5 className="title">
                {country.name}
            </h5>
        </div>
    );
}