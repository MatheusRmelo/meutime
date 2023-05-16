import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import Input from '../../components/Input';
import './style.css';
import ClientAPI from '../../utils/client.api';
import Loading from '../../components/Loading';
import ITeam from '../../interfaces/ITeam';
import ItemCard from '../../components/ItemCard';
import IPlayer from '../../interfaces/IPlayer';
import PlayerCard from '../../components/PlayerCard';
import ListCard from '../../components/ListCard';
import IStatistics from '../../interfaces/IStatistics';
import LineupCard from '../../components/LineupCard';
import InformationCard from '../../components/InformationCard';

export default function Teams(){
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const [statistics, setStatistics] = useState<IStatistics>();
    useEffect(()=>{
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            var client = new ClientAPI("");
            setPlayers(await client.getPlayers({id: 33, name: '', logo: '',code: null,country: '',founded: 0, national: false}, 2020));
            setStatistics(await client.getStatistics(39, 33, 2020));
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    return (
        <Container>
            <section className="team-area">
                {
                    loading || !statistics ?
                    <Loading />:
                    <div className="content">
                        <ListCard title='Jogadores'>
                            {
                                players.map((player)=><PlayerCard player={player}/>)
                            }
                        </ListCard>
                        <ListCard title={`${statistics!.lineups.length > 0 ? 'Formações' : 'Formação'} mais ${statistics!.lineups.length > 0 ? 'usadas' : 'usada'}`}>
                            {
                                statistics!.lineups.map((lineup)=><LineupCard lineup={lineup}/>)
                            }
                        </ListCard>
                        <div className="games">
                            <InformationCard 
                                title='Jogados'
                                value={statistics!.fixtures.played.total.toString()}
                            />
                            <InformationCard 
                                title='Vitórias'
                                value={statistics!.fixtures.wins.total.toString()}
                            />
                            <InformationCard 
                                title='Derrotas'
                                value={statistics!.fixtures.loses.total.toString()}
                            />
                            <InformationCard 
                                title='Empates'
                                value={statistics!.fixtures.draws.total.toString()}
                            />
                            <InformationCard 
                                title='Empates'
                                value={statistics!.minuteGoals[0].percentage}
                            />
                        </div>
                    </div>
                }
            </section>
        </Container>
    );
}