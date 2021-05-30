import styles from "./cardComponent.module.css";

export default function CardComponent(props) {
    const { name, email, comment } = props.comment;
    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardContent}>
                <h3>{name}</h3>
                <h3>{email}</h3>
                <p>{comment}</p>
            </div>
        </div>
    )
}