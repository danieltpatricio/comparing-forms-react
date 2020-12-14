import {
  BrowserRouter,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";

import { NakedForm } from "./pages/naked";
import { MaterialForm } from "./pages/material-ui";

import "./app.css";

export function App() {
  return (
    <BrowserRouter>
      <div className="nav">
        <NavLink className="item" to="/naked" exact>
          Naked
        </NavLink>
        <NavLink className="item" to="/material" exact>
          Material UI
        </NavLink>
      </div>
      <Switch>
        <Route path="/naked" component={NakedForm}></Route>
        <Route path="/material" component={MaterialForm}></Route>
        <Redirect from="/" to="/naked" />
      </Switch>
    </BrowserRouter>
  );
}
