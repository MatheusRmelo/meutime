import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import './style.css';
import Select from '../../components/Select';
import CountryCard from '../../components/CountryCard';
import ICountry from '../../interfaces/ICountry';
import ClientAPI from '../../utils/client.api';
import Loading from '../../components/Loading';

export default function Countries(){
    const [search, setSearch] = useState("");
    const [year, setYear] = useState("");
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getCountries();
    }, []);

    const getCountries = async () => {
        setLoading(true);
        try {
            var client = new ClientAPI("");
            var result = await client.getCountries();
            setCountries(result);
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    return (
        <Container>
            <section className="countries-area">
                <div className="header">
                    <Input label='Pesquisa' dominant value={search} onChange={(value)=>setSearch(value)}/>
                    <Button>
                        Pesquisar
                    </Button>
                    <Select dominant value={''} onChange={(value)=>{}}/>
                </div>
                {
                    loading?
                    <Loading />:
                    <div className="content">
                        {countries.map((country)=><CountryCard country={country}/>)}
                    </div>
                }
            </section>
        </Container>
    );
}