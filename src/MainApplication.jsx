import "./App.css";
import { 
    BrowserRouter as Router, 
    Route, 
    Switch } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import MyPetsPage from "./pages/MyPetsPage";
import PetPage from "./pages/PetPage";


export default function MainApplication() {
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
                        <MyPetsPage />
                    </Route>
                    <Route exact path="/profile">
                        <ProfilePage />
                    </Route>
                    <Route exact path="/pets/:id">
                        <PetPage />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}
