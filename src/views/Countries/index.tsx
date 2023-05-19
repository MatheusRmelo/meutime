import { Dispatch, useEffect, useMemo, useState } from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import './style.css';
import Select, { ISelectOption } from '../../components/Select';
import CountryCard from '../../components/CountryCard';
import ICountry from '../../interfaces/ICountry';
import ClientAPI from '../../utils/client.api';
import Loading from '../../components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/type';
import { useNavigate } from 'react-router-dom';
import { updateSeasonAndCountry } from '../../store/actions';

let timer: any;
export default function Countries(){
    const apiKey: string = useSelector((state: AppState) => state.key);
    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();

    const [search, setSearch] = useState("");
    const [season, setSeason] = useState("");
    const [seasons, setSeasons] = useState<number[]>([]);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [loading, setLoading] = useState(true);
    const optionsSeason = useMemo<ISelectOption[]>(()=>{
        return seasons.map((element)=>{return {name: element.toString(), value: element.toString()}});
    }, [seasons]);

    useEffect(()=>{
        if(timer){
            clearTimeout(timer);
        }
        timer = setTimeout(handleSearch, 500)

        return () => {
            clearTimeout(timer);
        }
    }, [search]);

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
            let seasons = await client.getSeasons();
            setSeasons(seasons);
            let date = new Date();
            if(seasons.find((element)=>element == date.getFullYear())){
                setSeason(date.getFullYear().toString());
            }
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

    const handleSearch = async () => {
        setLoading(true);
        try {
            var client = new ClientAPI(apiKey);
            var result = await client.searchCountry(search);
            setCountries(result);
        }catch(e){
            navigate('/');
        }finally{
            setLoading(false);
        }
    }

    return (
        <Container>
            <section className="countries-area">
                <div className="header">
                    <Input label='Pesquisa (mínimo 3 letras)' dominant value={search} onChange={(value)=>setSearch(value)}/>
                    <Button>
                        Pesquisar
                    </Button>
                    <Select dominant value={season} 
                        options={optionsSeason}
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