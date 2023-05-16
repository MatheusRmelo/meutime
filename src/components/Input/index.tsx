import React, { useEffect, useRef, useState } from "react";
import './style.css';

interface Props {
    label: string,
    value: string,
    type?: string,
    dominant?: boolean,
    onChange: (value: string) => void
}
export default function Input({label, value, type = 'text', dominant = false, onChange} : Props){
    const inputRef : React.LegacyRef<HTMLInputElement> = useRef(null)
    const [focused, setFocused] = useState(false)

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const handleClickFocus = () => {
        inputRef.current!.focus();
    }

    useEffect(()=>{
        if (document.activeElement === inputRef.current) {
            setFocused(true);
        }
    }, []);

    

    return (
        <div className={`input ${focused && 'focus'} ${dominant && 'dominant'}`} onClick={handleClickFocus}>
            <label className={focused || value ? 'active' : ''}>{label}</label>
            <input className={focused || value ? 'active' : ''} type={type} ref={inputRef} 
                value={value} 
                onChange={(e)=>onChange(e.target.value)} 
                onFocus={onFocus} 
                onBlur={onBlur}
            />
        </div>
    );
}