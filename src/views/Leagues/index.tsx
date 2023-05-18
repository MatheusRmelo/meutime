import { Dispatch, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import './style.css';
import ClientAPI from '../../utils/client.api';
import Loading from '../../components/Loading';
import ILeague from '../../interfaces/ILeague';
import LeagueCard from '../../components/LeagueCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/type';
import { useNavigate } from 'react-router-dom';
import { updateLeague } from '../../store/actions';

export default function Leagues(){
    const state = useSelector((state: AppState) => state);
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [leagues, setLeagues] = useState<ILeague[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(state.country == null || state.season == null){
            navigate('/countries');
        }else{
            getLeagues();
        }
    }, []);

    const getLeagues = async () => {
        setLoading(true);
        try {
            var client = new ClientAPI(state.key);
            var result = await client.getLeagues(state.country!, state.season!);
            setLeagues(result);
        }catch(e){
            navigate('/');
        }finally{
            setLoading(false);
        }
    }

    const handleClickLeague = (league: ILeague) => {
        dispatch(updateLeague(league));
        navigate('/teams');
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
                        {leagues.map((league)=>(
                            <LeagueCard 
                                key={league.id} 
                                league={league}
                                onClick={()=>handleClickLeague(league)}    
                            />
                        ))}
                    </div>
                }
            </section>
        </Container>
    );
}