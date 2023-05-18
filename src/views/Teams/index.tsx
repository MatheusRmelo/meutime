import { Dispatch, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import './style.css';
import ClientAPI from '../../utils/client.api';
import Loading from '../../components/Loading';
import ITeam from '../../interfaces/ITeam';
import ItemCard from '../../components/ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store/type';
import { useNavigate } from 'react-router-dom';
import { updateTeam } from '../../store/actions';

export default function Teams(){
    const state = useSelector((state: AppState) => state);
    const dispatch: Dispatch<any> = useDispatch();
    const navigate = useNavigate();
    
    const [search, setSearch] = useState("");
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(state.league == null){
            navigate('/leagues');
        }else{
            getTeams();
        }
    }, []);

    const getTeams = async () => {
        setLoading(true);
        try {
            var client = new ClientAPI(state.key);
            var result = await client.getTeams(state.league!, state.season!);
            setTeams(result);
        }catch(e){
            navigate('/');
        }finally{
            setLoading(false);
        }
    }

    const handleClickTeam = (team: ITeam) => {
        dispatch(updateTeam(team));
        navigate('/team');
    }

    return (
        <Container>
            <section className="teams-area">
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
                        {teams.map((team)=>(
                            <ItemCard 
                                key={team.id} image={team.logo} name={team.name}
                                onClick={()=>handleClickTeam(team)}/>
                        ))}
                    </div>
                }
            </section>
        </Container>
    );
}