import "./App.css";
import AuthProvider, { useAuth } from "./context/AuthContext";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import SearchPage from "./pages/SearchPage";
import MyPetsPage from "./pages/MyPetsPage";
import ProfilePage from "./pages/ProfilePage";
import PetPage from "./pages/PetPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddPet from "./pages/AdminAddPet";
import AdminEditPetPage from "./pages/AdminEditPetPage";

function PrivateRoute({ children, ...rest }) {
    const { token } = useAuth();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                token ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}

function AppRouter() {

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/search">
                    <SearchPage />
                </Route>
                <Route exact path="/pets/:id">
                    <PetPage />
                </Route>
                <Route exact path="/admin">
                    <AdminDashboard />
                </Route>
                <Route exact path="/admin/pet/add">
                    <AdminAddPet />
                </Route>
                <Route exact path="/admin/pet/:id">
                    <AdminEditPetPage />
                </Route>
                <PrivateRoute exact path="/my-pets">
                    <MyPetsPage />
                </PrivateRoute>
                <PrivateRoute exact path="/profile">
                    <ProfilePage />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}
