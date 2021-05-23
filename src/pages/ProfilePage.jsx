import FormComponent from "../components/ProfilePage/FormComponent";

export default function ProfilePage() {
    return (
        <div>
            <div className="text-center"> 
                <h1>Edit your Profile.</h1>
                <p>When you are done, click "Update Profile".</p>
                <p>If you change your password, make sure both passwords match. </p>
                <p>Make sure the fields are entered in the correct formats.</p>
            </div>  
            <FormComponent />
        </div>
    );
}