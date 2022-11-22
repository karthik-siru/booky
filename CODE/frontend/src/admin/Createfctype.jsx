import React, { useState } from "react";
import Base from "../core/components/Base";
import { isAuthenticated } from "../auth/helper/user";
import { Link } from "react-router-dom";
import { createfcType } from "./helper/adminapicalls";
import { Alert, Button, Paper, Typography } from "@mui/material";
import "../styles.css";
import ResponsiveAppBar from "../core/components/AppBar";

const paperstyle = {
  padding: "4%",
};

const CreatefcTypes = () => {
  const [name, setName] = useState("");
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

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    // backend req fired
    createfcType(user._id, token, { name })
      .then((data) => {
        if (data && data.err) {
          setError(data.err);
        } else {
          setName("");
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
      return <Alert severity="success">Successfully Created fctype</Alert>;
    }
  };

  const warningMessage = () => {
    if (error) {
      return <Alert severity="error">Unable to create fctype : {error} </Alert>;
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
              onChange={handleChange}
              autoFocus
              required
              placeholder="Ex: Computer"
              value={name}
            />
            <Button variant="outlined" onClick={onSubmit}>
              Create fcType
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
        title="Create a fctype"
        description="Add a new fctype for NITC facility "
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

export default CreatefcTypes;
