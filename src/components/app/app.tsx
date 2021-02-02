import React from "react";
import { Route, Switch } from "react-router-dom";

// Components
import Home from "../../pages/home/home";
import Login from "../../pages/login/login";
import InstagramBusinessAccount from "../../pages/instagramBusinessAccount/instagramBusinessAccount";
import Navigation from "../navigation/navigation";
import Account from "../../pages/account/account";
import About from "../../pages/about/about";
import ProtectedRoute, {
  ProtectedRouteProps,
} from "../protectedRoute/protectedRoute";
import { useSessionContext } from "../../contexts/sessionContext";

const App: React.FC = () => {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const setRedirectPathOnAuthentication = (path: string) => {
    updateSessionContext({
      ...sessionContext,
      redirectPathOnAuthentication: path,
    });
  };

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!sessionContext.isAuthenticated,
    authenticationPath: "/login",
    redirectPathOnAuthentication:
      sessionContext.redirectPathOnAuthentication || "",
    setRedirectPathOnAuthentication,
  };
  return (
    <div className="container">
      <Navigation />
      <Switch>
        <Route exact path="/login" component={Login}></Route>
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          exact={true}
          path="/"
          component={Home}
        />
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          path="/instagramBusinessAccount"
          component={InstagramBusinessAccount}
        />
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          path="/account"
          component={Account}
        />
        <ProtectedRoute
          {...defaultProtectedRouteProps}
          path="/about"
          component={About}
        />
      </Switch>
    </div>
  );
};

export default App;
