import { Link, withRouter } from "react-router-dom";
import styles from "./cardComponent.module.css";

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
        <div className={styles.cardContainer}>
            <div className={styles.imageContainer}>
                <img className={styles.cardImage} src={picture} alt="Pet"/>
            </div>
            <div className={styles.cardContent}>
                <h3>{name}</h3>
                <h4>
                    {adoption_status === "AVAILABLE" && "Available"}
                    {adoption_status === "ADOPTED" && "Adopted"}
                    {adoption_status === "FOSTERED" && "Fostered"}
                </h4>
                <Link to={linkName}>See more</Link>
            </div>
            
        </div>
    );
}

export default withRouter(CardComponent);
