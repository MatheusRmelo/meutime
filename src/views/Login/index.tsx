import { Dispatch, useState } from 'react';
import Input from '../../components/Input';
import './style.css';
import Button from '../../components/Button';
import ClientAPI from '../../utils/client.api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateApiKey } from '../../store/actions';

export default function Login(){
    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();

    const [key, setKey] = useState("");
    const [loading, setLoading] = useState(false);

    const handleClickLogin = async () => {
        setLoading(true);
        try {
            var client = new ClientAPI(key);
            var result = await client.checkKey();
            if(result){
                dispatch(updateApiKey(key));
                navigate('/countries');
            }else{
                alert('Invalid Key');
            }
        }catch(e){
            console.log(e);
        }finally{
            setLoading(false);
        }
    }

    return (
        <main className="login-area">
            <aside className="banner">
                <img src="/assets/goal.svg" alt="Goal Image" />
                <div className="information">
                    <h2 className='title'>Meu time é sua plataforma favorita de esporte</h2>
                    <p>
                        Tenha acesso a todos detalhes do seu time, suas ligas favoritas, acompanhe os resultados e muito mais. Tudo isso com apenas alguns cliques.
                    </p>
                </div>
            </aside>
            <section className="form-area">
                <form action="">
                    <h1>Bem vindo de volta! Entre agora no Meu Time</h1>
                    <Input label='Chave de API do API-FOOTBALL' value={key} onChange={(value)=>setKey(value)}/>
                    <Button disabled={!key || loading} isLoading={loading} onClick={key ? handleClickLogin : () => {}}>
                        Entrar
                    </Button>
                </form>
            </section>
        </main>
    );
}