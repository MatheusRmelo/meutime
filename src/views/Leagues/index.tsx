import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import './style.css';
import ClientAPI from '../../utils/client.api';
import Loading from '../../components/Loading';
import ILeague from '../../interfaces/ILeague';
import LeagueCard from '../../components/LeagueCard';

export default function Leagues(){
    const [search, setSearch] = useState("");
    const [leagues, setLeagues] = useState<ILeague[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getLeagues();
    }, []);

    const getLeagues = async () => {
        setLoading(true);
        try {
            var client = new ClientAPI("");
            var result = await client.getLeagues({code: 'BR', name: '', flag: ''}, 2023);
            setLeagues(result);
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
                </div>
                {
                    loading?
                    <Loading />:
                    <div className="content">
                        {leagues.map((league)=><LeagueCard league={league}/>)}
                    </div>
                }
            </section>
        </Container>
    );
}