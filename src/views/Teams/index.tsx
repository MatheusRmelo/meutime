import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import './style.css';
import ClientAPI from '../../utils/client.api';
import Loading from '../../components/Loading';
import ITeam from '../../interfaces/ITeam';
import ItemCard from '../../components/ItemCard';

export default function Teams(){
    const [search, setSearch] = useState("");
    const [teams, setTeams] = useState<ITeam[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        getTeams();
    }, []);

    const getTeams = async () => {
        setLoading(true);
        try {
            var client = new ClientAPI("");
            var result = await client.getTeams({id: 522, name: '', logo: '', type: ''}, 2023);
            setTeams(result);
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
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
                        {teams.map((team)=><ItemCard key={team.id} image={team.logo} name={team.name} />)}
                    </div>
                }
            </section>
        </Container>
    );
}