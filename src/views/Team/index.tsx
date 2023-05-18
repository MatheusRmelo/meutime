import { useEffect, useMemo, useState } from 'react';
import Container from '../../components/Container';
import './style.css';
import ClientAPI from '../../utils/client.api';
import Loading from '../../components/Loading';
import IPlayer from '../../interfaces/IPlayer';
import PlayerCard from '../../components/PlayerCard';
import ListCard from '../../components/ListCard';
import IStatistics from '../../interfaces/IStatistics';
import LineupCard from '../../components/LineupCard';
import InformationCard from '../../components/InformationCard';
import Chart from 'react-google-charts';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppState } from '../../store/type';

export default function Team(){
    const state = useSelector((state: AppState) => state);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const [statistics, setStatistics] = useState<IStatistics>();

    const chartData = useMemo<any[]>(()=>{
        if(!statistics) return [];

        let result: any[] = [["Minutos", "Gols"]];
        statistics!.minuteGoals.forEach((element)=>{
            result.push([
                element.minute,
                element.total ?? 0
            ]);
        });
        return result;
    }, [statistics]);

    useEffect(()=>{
        if(state.team == null || state.league == null || state.season == null){
            navigate('/teams');
        }else{
            getData();
        }
    }, []);

    const getData = async () => {
        setLoading(true);
        try {
            var client = new ClientAPI(state.key);
            setPlayers(await client.getPlayers(state.team!, state.season!));
            setStatistics(await client.getStatistics(state.league!.id, state.team!.id, state.season!));
        }catch(e){
            navigate('/');
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
                                players.map((player)=><PlayerCard key={player.id} player={player}/>)
                            }
                        </ListCard>
                        <ListCard title={`${statistics!.lineups.length > 0 ? 'Formações' : 'Formação'} mais ${statistics!.lineups.length > 0 ? 'usadas' : 'usada'}`}>
                            {
                                statistics!.lineups.map((lineup, index)=><LineupCard key={index} lineup={lineup}/>)
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
                        </div>
                        <div className="chart-area">
                            <Chart
                                chartType="BarChart"
                                width="100%"
                                height="400px"
                                data={chartData}
                                className='chart'
                                options={{
                                    title: "Gols por minuto",
                                    chartArea: { width: "50%" },
                                    hAxis: {
                                    title: "Total de gols",
                                    minValue: 0,
                                    },
                                    vAxis: {
                                    title: "Minutos",
                                    },
                                }}
                            />
                        </div>
                    </div>
                }
            </section>
        </Container>
    );
}

