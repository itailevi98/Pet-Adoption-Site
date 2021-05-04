
import { useAuth } from "../../context/AuthContext";
import styles from "./styles/homepage.module.css";

export default function HeaderComponent() {
    const { user } = useAuth();
    return (
        <h1 className={styles.header}>
            {user && `Welcome ${user.first_name} ${user.last_name}!`}
            {!user && "Find The Perfect Pet For You!"}
        </h1>  
    );
}