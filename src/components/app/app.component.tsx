import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "../../pages/home/home.page";
import Login from "../../pages/login/login.page";
import InstagramBusinessAccount from "../../pages/instagramBusinessAccount/instagramBusinessAccount.page";

import "../../common/styles";
import "./app.component.css";
import Navigation from "../navigation/navigation.component";
import Account from "../../pages/account/account.page";
import About from "../../pages/about/about.page";

const App: React.FC = () => {
  return (
    <div className="container">
      <Router>
        <Navigation />

        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route
            path="/instagramBusinessAccount"
            component={InstagramBusinessAccount}
          ></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/account" component={Account}></Route>
          <Route path="/about" component={About}></Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
