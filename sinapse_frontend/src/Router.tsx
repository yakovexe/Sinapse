import { Router, Route, RouteSectionProps } from "@solidjs/router";
import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import CardsHome from "./pages/CardsHome";

const RouterComponent = () => {
  return (
    <Router root={App}>
      <Route path="/" component={Home}></Route>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/aboutus" component={AboutUs} />
      <Route path="/cardshome" component={CardsHome} />
    </Router>
  );
};

export default RouterComponent;
