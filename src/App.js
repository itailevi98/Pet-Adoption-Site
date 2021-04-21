import "./App.css";
import AuthProvider, { useAuth } from "./context/AuthContext";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Homepage from "./pages/Homepage";
import SearchPage from "./pages/SearchPage";
import MyPetsPage from "./pages/MyPetsPage";
import ProfilePage from "./pages/ProfilePage";
import PetPage from "./pages/PetPage";

function PrivateRoute({ children, ...rest }) {
    let auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
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
        <Router>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/search">
                    <SearchPage />
                </Route>
                <PrivateRoute exact path="/my-pets">
                    <MyPetsPage />
                </PrivateRoute>
                <PrivateRoute exact path="/profile">
                    <ProfilePage />
                </PrivateRoute>
                <PrivateRoute exact path="/pets/:id">
                    <PetPage />
                </PrivateRoute>
            </Switch>
        </Router>
    )
}

export default function App() {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
}
