import "./App.css";

import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";

import Desktop from "./pages/Desktop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/SignUp">
            <SignUp />
          </Route>
          <Route path="/SignIn">
            <SignIn />
          </Route>
          <Route path="/app">
            <Desktop />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
