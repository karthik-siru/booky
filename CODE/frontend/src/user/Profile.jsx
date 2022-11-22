import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Base from "../core/components/Base";
import { isAuthenticated } from "../auth/helper/user";
import ResponsiveAppBar from "../core/components/AppBar";
import "../styles.css";
import IMG from "../images/profile.svg";

const Profile = () => {
  const {
    user: { name, email },
  } = isAuthenticated();
  const dashboardLeft = () => {
    //
    return (
      <div className="card shadow" style={{ marginLeft: "9px" }}>
        <h4 className="card-header bg-primary text-white text-center">
          User Photo
        </h4>
        <ul className="List-group" style={{ padding: "0px" }}>
          <div style={{ width: "80%", margin: "0 0 0 100px " }}>
            <img src={IMG} width={200} alt="Profile Image" />
          </div>
        </ul>
      </div>
    );
  };
  const dashboardRight = () => {
    //
    return (
      <div className="card shadow " style={{ marginRight: "9px" }}>
        <h4 className="card-header bg-dark text-white text-center">
          User Information
        </h4>
        <ul className="list-group" style={{ textAlign: "justify" }}>
          <li className="list-group-item">
            <Button variant="outlined" color="primary">
              User Name:
            </Button>
            <Typography variant="body" gutterBottom>
              {name}
            </Typography>
          </li>
          <li className="list-group-item">
            <Button variant="outlined" color="success">
              User Email:
            </Button>
            <Typography variant="body" gutterBottom>
              {email}
            </Typography>
          </li>
          <li className="list-group-item">
            <Button variant="outlined" color="success">
              Use Area
            </Button>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <div>
      <ResponsiveAppBar />
      <Base title="User Profile" description="It's All about You.">
        <div className="row justify-content-center">
          <div className="col-4">{dashboardLeft()}</div>
          <div className="col-6">{dashboardRight()}</div>
        </div>
      </Base>
    </div>
  );
};

export default Profile;
