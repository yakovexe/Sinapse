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
          path="/decks"
          component={lazy(() => import("./pages/Decks"))}
        ></Route>
        <Route
          path="/flashcards/:id"
          component={lazy(() => import("./pages/Flashcards"))}
        ></Route>
        <Route
          path="/play/:id"
          component={lazy(() => import("./pages/Play"))}
        ></Route>
      </Route>
    </Router>
  );
};

export default RouterComponent;
