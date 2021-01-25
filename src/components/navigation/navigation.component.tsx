import React from "react";
import { Link } from "react-router-dom";

const Navigation: React.FC = () => {
  console.log(process.env.FACEBOOK_APP_ID || "12345");
  return (
    <ul className="nav justify-content-center mb-4 navigation">
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/instagramBusinessAccount">
          InstagramBusinessAccount
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
