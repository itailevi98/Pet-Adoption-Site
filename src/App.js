import "./App.css";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Homepage />
                </Route>
                <Route exact path="/search">
                    <SearchPage />
                </Route>
            </Switch>
        </Router>
    );
}
