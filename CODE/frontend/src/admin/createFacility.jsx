import React, { useState } from "react";
import Base from "../core/components/Base";
import { isAuthenticated } from "../auth/helper/user";
import { Link } from "react-router-dom";
import { createFacility } from "./helper/adminapicalls";
import { Alert, Button, Paper, Typography } from "@mui/material";
import "../styles.css";
import ResponsiveAppBar from "../core/components/AppBar";

const paperstyle = {
  padding: "4%",
};

const Createfacility = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    location: "",
  });
  const { name, description, location } = values;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="md-5">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const handleChange = (name) => (event) => {
    setError("");
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    // backend req fired
    createFacility(user._id, token, { name, description, location })
      .then((data) => {
        if (data && data.err) {
          setError(data.err);
        } else {
          setValues({ ...values });
          setError("");
          setSuccess(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const successMessage = () => {
    if (success) {
      return <Alert severity="success">Successfully Created facility </Alert>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return (
        <Alert severity="error">Unable to create facility : {error} </Alert>
      );
    }
  };

  const categoryForm = () => {
    return (
      <Paper elevation={10} style={paperstyle}>
        <form>
          <div className="form-group">
            <Typography variant="h5" align="center">
              Enter the new fcType{" "}
            </Typography>
            <input
              type="text"
              className="form-control my-3"
              onChange={handleChange("name")}
              required
              placeholder="Ex: AUDI"
              value={name}
            />
            <input
              type="text"
              className="form-control my-3"
              onChange={handleChange("description")}
              required
              placeholder="Ex: A place to play badminton peacefully"
              value={description}
            />
            <input
              type="text"
              className="form-control my-3"
              onChange={handleChange("location")}
              required
              placeholder="Near Architechture building"
              value={location}
            />
            <Button variant="outlined" onClick={onSubmit}>
              Create Facility
            </Button>
          </div>
        </form>
      </Paper>
    );
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Base
        title="Create a Facility"
        description="Add a new facility to the NITC Community"
      >
        <div className="col-md-8 offset-md-2">
          {goBack()}
          {successMessage()}
          {warningMessage()}
          {categoryForm()}
        </div>
      </Base>
    </div>
  );
};

export default Createfacility;
