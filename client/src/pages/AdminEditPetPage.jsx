import { useParams } from "react-router"
import FormComponent from "../components/Admin/AdminEditPet/FormComponent";

export default function AdminEditPetPage() {
    const { id } = useParams();

    return (
        <div>
            <h1 className="text-center">Edit a Pet</h1>
            <FormComponent petId={id}/>
        </div>
        
    )
}