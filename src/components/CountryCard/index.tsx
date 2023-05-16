import ICountry from '../../interfaces/ICountry';
import './style.css';

interface Props {
    country: ICountry,
}
export default function CountryCard({ country } : Props){
    return (
        <div className="country-card">
            <img src={country.flag} alt="" />
            <h5 className="title">
                {country.name}
            </h5>
        </div>
    );
}