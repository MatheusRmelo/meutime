import './style.css';

interface Props {
    image: string,
    name: string,
}
export default function ItemCard({ name, image } : Props){
    return (
        <div className="item-card">
            <img src={image} alt="" />
            <h5 className="title">
                {name}
            </h5>
        </div>
    );
}