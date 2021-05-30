import "./App.css";
import AuthProvider, { useAuth } from "./context/AuthContext";
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from "react-router-dom";
import { AnimatedSwitch } from 'react-router-transition';
import Homepage from "./pages/Homepage";
import SearchPage from "./pages/SearchPage";
import MyPetsPage from "./pages/MyPetsPage";
import ProfilePage from "./pages/ProfilePage";
import PetPage from "./pages/PetPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAddPet from "./pages/AdminAddPet";
import AdminEditPetPage from "./pages/AdminEditPetPage";
import NavbarComponent from "./components/NavbarComponent/NavbarComponent";
import ScrollToTop from "./components/ScrollToTop";
import ContactPage from "./pages/ContactPage";
import AdminSupportPage from "./pages/AdminSupportPage";

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
    const { isInitiallyLoaded } = useAuth();

    if (!isInitiallyLoaded) {
        return <div></div>;
    }

    return (
        <div>
            <Router>
                <ScrollToTop>
                    <NavbarComponent />
                    <AnimatedSwitch
                    atEnter={{ opacity: 0 }}
                    atLeave={{ opacity: 0 }}
                    atActive={{ opacity: 1 }}
                    className="switch-wrapper"
                    >
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
                        <Route exact path="/contact">
                            <ContactPage />
                        </Route>
                        <Route exact path="/admin/support">
                            <AdminSupportPage />
                        </Route>
                        <PrivateRoute exact path="/my-pets">
                            <MyPetsPage />
                        </PrivateRoute>
                        <PrivateRoute exact path="/profile">
                            <ProfilePage />
                        </PrivateRoute>
                        
                    </AnimatedSwitch>
                </ScrollToTop>
            </Router>
        </div>
    );
};

export default function App() {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}