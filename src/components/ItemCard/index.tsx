import './style.css';

interface Props {
    image: string,
    name: string,
    onClick: () => void,
}
export default function ItemCard({ name, image, onClick } : Props){
    return (
        <div className="item-card" onClick={onClick}>
            <img src={image} alt="" />
            <h5 className="title">
                {name}
            </h5>
        </div>
    );
}