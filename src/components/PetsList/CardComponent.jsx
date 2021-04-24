import { Link, withRouter } from "react-router-dom";
import './cardComponentStyles.css';

function CardComponent(props) {
    const { pet } = props;
    const { 
        pet_id,
        name, 
        adoption_status,
        picture
    } = pet;
    const linkName = `/pets/${pet_id}`;

    return ( 
        <div className="card-container d-flex flex-column p-4 m-3">
            <img src={picture} alt="Pet"/>
            <h3>{name}</h3>
            <h4>{adoption_status}</h4>
            <Link to={linkName}>See more</Link>
        </div>
    );
}

export default withRouter(CardComponent);
