import { useParams } from "react-router"
import FormComponent from "../components/Admin/AdminEditPet/FormComponent";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";

export default function AdminEditPetPage() {
    const { id } = useParams();

    return (
        <div>
            <NavbarComponent />
            <FormComponent petId={id}/>
        </div>
        
    )
}