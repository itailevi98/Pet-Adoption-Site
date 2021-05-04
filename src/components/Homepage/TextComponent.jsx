import { Link } from "react-router-dom";

export default function TextComponent() {
    return (
        <p className={"text-center"}>Looking for the perfect pet? Join today and you can adopt, foster, or save any pet! You can also use the <Link to="/search">search page</Link> to find different pets of all kinds.</p>
    )
}