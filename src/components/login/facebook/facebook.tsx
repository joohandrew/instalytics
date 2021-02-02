import React from "react";
import FacebookLogin from "react-facebook-login";
import { useHistory } from "react-router-dom";
import { useSessionContext } from "../../../contexts/sessionContext";

const Facebook: React.FC = () => {
  const [sessionContext, updateSessionContext] = useSessionContext();
  const history = useHistory();

  const responseFacebook = (response: any) => {
    updateSessionContext({...sessionContext, isAuthenticated: true, accessToken: response.accessToken});
    history.push("/");
  };

  return (
    <div className="facebook">
      <FacebookLogin
        appId="814621629389417"
        autoLoad={true}
        fields="name,email,picture"
        callback={(response) => responseFacebook(response)}
      />
    </div>
  );
};

export default Facebook;
