import { useState } from "react";
import { deleteComment } from "../../../lib/supportApi";
import styles from "./cardComponent.module.css";

export default function CardComponent(props) {
    const { name, email, comment } = props.comment;
    const [resolved, setResolved] = useState(false);

    async function handleOnClick() {
        await deleteComment(props.comment);
        setResolved(true);
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.cardContent}>
                <h3>{name}</h3>
                <h3>{email}</h3>
                <p>{comment}</p>
            </div>
            <div>
                {!resolved && <button onClick={() => handleOnClick()} className="btn btn-primary">Resolve</button>}
                {resolved && <div class="alert alert-success" role="alert">
                    Resolved!
                </div>}
            </div>
        </div>
    )
}
