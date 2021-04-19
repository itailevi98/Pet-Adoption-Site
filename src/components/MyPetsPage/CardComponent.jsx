import { Link, withRouter } from "react-router-dom";
import './cardComponentStyles.css';

function CardComponent(props) {
    const { pet } = props;
    const { 
        id,
        name, 
        adoptionStatus,
        picture
    } = pet;
    const linkName = `/pets/${id}`;

    return ( 
        <div className="card-container d-flex flex-column p-4 m-3">
            <img src={picture} alt="Pet"/>
            <h3>{name}</h3>
            <h4>{adoptionStatus}</h4>
            <Link to={linkName}>See more</Link>
        </div>
    );
}

export default withRouter(CardComponent);
