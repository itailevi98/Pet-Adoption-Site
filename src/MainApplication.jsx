import "./App.css";
import { 
    BrowserRouter as Router, 
    Route, 
    Switch,
    Redirect } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import MyPetsPage from "./pages/MyPetsPage";
import PetPage from "./pages/PetPage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


export default function MainApplication() {
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Homepage />
                    </Route>
                    <Route exact path="/search">
                        <SearchPage />
                    </Route>
                    <Route exact path="/my-pets">
                        {!user ? <Redirect to="/"/>  : <MyPetsPage />}
                    </Route>
                    <Route exact path="/profile">
                        {!user ? <Redirect to="/"/>  : <ProfilePage />}
                    </Route>
                    <Route exact path="/pets/:id">
                        {!user ? <Redirect to="/"/>  : <PetPage />}
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
