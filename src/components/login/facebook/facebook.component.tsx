import React from "react";
import FacebookLogin from "react-facebook-login";
import { useHistory } from "react-router-dom";

const Facebook: React.FC = () => {
  const history = useHistory();

  const responseFacebook = (response: any) => {
    console.log(response);
    // TODO: should probably store user properties in database of some sort
    localStorage.setItem("name", response.name);
    localStorage.setItem("email", response.email);
    localStorage.setItem("picture", response.picture.data.url);
    localStorage.setItem("accessToken", response.accessToken);
    history.push("/");
  };

  return (
    <div className="facebook">
      <FacebookLogin
        appId="814621629389417"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
};

export default Facebook;
