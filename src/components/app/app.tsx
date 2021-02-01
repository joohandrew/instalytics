import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import InstagramBusinessAccount from "../../pages/instagramBusinessAccount/instagramBusinessAccount";
import Navigation from "../navigation/navigation";
import Account from "../../pages/account/account";
import About from "../../pages/about/about";

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
