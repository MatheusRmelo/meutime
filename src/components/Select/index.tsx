import './style.css';

interface Props {
    value: string,
    options: SelectOption[],
    dominant?: boolean,
    onChange: (value: string) => void
}

interface SelectOption {
    name: string,
    value: string,
}

export default function Select({value, dominant = false, options, onChange}: Props){
    return (
        <select className={`${dominant && 'dominant'}`} value={value} onChange={(e)=>onChange(e.target.value)}>
            {
                options.map((element)=><option key={element.value} value={element.value}>{element.name}</option>)
            }
        </select>
    );
}

