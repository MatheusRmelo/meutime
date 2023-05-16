import './style.css';

interface Props {
    value: string,
    dominant?: boolean,
    onChange: (value: string) => void
}

export default function Select({value, dominant = false, onChange}: Props){
    return (
        <select className={`${dominant && 'dominant'}`} value={value} onChange={(e)=>onChange(e.target.value)}>
            <option>TESTE</option>
        </select>
    );
}