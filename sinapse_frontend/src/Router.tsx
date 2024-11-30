import { Router, Route } from "@solidjs/router";
import App from "./App";
import { lazy } from "solid-js";
import { AuthGuard } from "./components/AuthGuard";

const RouterComponent = () => {
  return (
    <Router root={App}>
      {/* Public Routes */}
      <Route path="/" component={lazy(() => import("./pages/Home"))}></Route>
      <Route path="/login" component={lazy(() => import("./pages/Login"))} />
      <Route
        path="/register"
        component={lazy(() => import("./pages/Register"))}
      />
      <Route path="/about" component={lazy(() => import("./pages/About"))} />
      {/* Private Routes */}
      <Route path="/" component={AuthGuard}>
        <Route
          path="/cardshome"
          component={lazy(() => import("./pages/CardsHome"))}
        ></Route>
        <Route
          path="/deck/:id"
          component={lazy(() => import("./pages/Deck"))}
        ></Route>
      </Route>
    </Router>
  );
};

export default RouterComponent;
