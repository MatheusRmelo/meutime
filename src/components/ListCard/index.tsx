import './style.css';

interface Props {
    title: string,
    children: React.ReactElement[], 
}

export default function ListCard({title, children} : Props){
    return (
        <div className="list-card">
            <h4 className='title'>{title}</h4>
            <div className="items">
                {children}
            </div>
        </div>
    );
}