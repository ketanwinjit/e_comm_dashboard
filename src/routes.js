import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoutes from "./AuthRoutes/PrivateRoutes";
import NavBarHeader from "./components/NavBarHeader";
import Sidebar from "./components/Sidebar";
import Categories from "./pages/Categories";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Others from "./pages/Others";
import Products from "./pages/Products";

function routes() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute />
        </Switch>
      </Router>
    </>
  );
}

const PrivateRoute = () => {
  return (
    <>
      <NavBarHeader />
      <Sidebar />
      <PrivateRoutes exact path="/store/dashboard" component={Dashboard} />
      <PrivateRoutes exact path="/store/categories" component={Categories} />
      <PrivateRoutes exact path="/store/orders" component={Orders} />
      <PrivateRoutes exact path="/store/products" component={Products} />
      <PrivateRoutes exact path="/store/others" component={Others} />
    </>
  );
};

export default routes;
