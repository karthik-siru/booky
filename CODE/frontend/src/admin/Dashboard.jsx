import React from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import Base from "../core/components/Base";
import { isAuthenticated } from "../auth/helper/user";
import ResponsiveAppBar from "../core/components/AppBar";
import "../styles.css";

const Dashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();
  const dashboardLeft = () => {
    //
    return (
      <div className="card shadow" style={{ marginLeft: "9px" }}>
        <h4 className="card-header bg-primary text-white text-center">
          Admin Navigation
        </h4>
        <ul className="List-group" style={{ padding: "0px" }}>
          <li className="List-group-item">
            <Link
              to="/fctype/create"
              className="nav-link"
              style={{ color: "#212529" }}
            >
              Create fcType
            </Link>
            <Link
              to="/fctype/manage"
              className="nav-link"
              style={{ color: "#212529" }}
            >
              Manage fcTypes
            </Link>
            <Link
              to="/facility/create"
              className="nav-link"
              style={{ color: "#212529" }}
            >
              Create Facility
            </Link>
            <Link
              to="/facility/manage"
              className="nav-link"
              style={{ color: "#212529" }}
            >
              Manage facilities
            </Link>
            <Link
              to="/facility/appendfc"
              className="nav-link"
              style={{ color: "#212529" }}
            >
              Append to Facility
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const dashboardRight = () => {
    //
    return (
      <div className="card shadow " style={{ marginRight: "9px" }}>
        <h4 className="card-header bg-dark text-white text-center">
          Admin Information
        </h4>
        <ul className="list-group" style={{ textAlign: "justify" }}>
          <li className="list-group-item">
            <Button variant="outlined" color="primary">
              Admin Name:
            </Button>
            <Typography variant="button" gutterBottom>
              {name}
            </Typography>
          </li>
          <li className="list-group-item">
            <Button variant="outlined" color="success">
              Admin Email:
            </Button>
            <Typography variant="button" gutterBottom>
              {email}
            </Typography>
          </li>
          <li className="list-group-item">
            <Button variant="outlined" color="error">
              Admin Area Watchout !!
            </Button>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <div>
      <ResponsiveAppBar />
      <Base
        title="Admin Dashboard"
        description="Manage all the NITC facility from here"
      >
        <div className="row justify-content-center">
          <div className="col-4">{dashboardLeft()}</div>
          <div className="col-6">{dashboardRight()}</div>
        </div>
      </Base>
    </div>
  );
};

export default Dashboard;
