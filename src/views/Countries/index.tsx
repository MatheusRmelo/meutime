import { Dispatch, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import './style.css';
import Select from '../../components/Select';
import CountryCard from '../../components/CountryCard';
import ICountry from '../../interfaces/ICountry';
import ClientAPI from '../../utils/client.api';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/type';
import { useNavigate } from 'react-router-dom';
import { updateSeasonAndCountry } from '../../store/actions';

export default function Countries(){
    const apiKey: string = useSelector((state: AppState) => state.key);
    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();

    const [search, setSearch] = useState("");
    const [season, setSeason] = useState("2023");
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(!apiKey){
            navigate('/');
        }else{
            getCountries();
        }
    }, []);

    const getCountries = async () => {
        setLoading(true);
        try {
            var client = new ClientAPI(apiKey);
            var result = await client.getCountries();
            setCountries(result);
        }catch(e){
            navigate('/');
        }finally{
            setLoading(false);
        }
    }

    const handleClickCountry = (country: ICountry) => {
        dispatch(updateSeasonAndCountry(country, parseInt(season)));
        navigate('/leagues');
    }

    return (
        <Container>
            <section className="countries-area">
                <div className="header">
                    <Input label='Pesquisa' dominant value={search} onChange={(value)=>setSearch(value)}/>
                    <Button>
                        Pesquisar
                    </Button>
                    <Select dominant value={season} 
                        options={[
                            {name: "2023", value: "2023"},
                            {name: "2022", value: "2022"}
                        ]}
                        onChange={(value)=>setSeason(value)}/>
                </div>
                {
                    loading?
                    <Loading />:
                    <div className="content">
                        {countries.map((country, index)=>(
                            <CountryCard key={index} country={country} onClick={()=>handleClickCountry(country)} />
                        ))}
                    </div>
                }
            </section>
        </Container>
    );
}