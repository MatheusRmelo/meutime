import './style.css';

interface Props {
    value: string,
    options: ISelectOption[],
    dominant?: boolean,
    onChange: (value: string) => void
}

export interface ISelectOption {
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

