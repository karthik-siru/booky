import React, { useState, useEffect } from "react";
import Base from "../core/components/Base";
import { isAuthenticated } from "../auth/helper/user";
import { Link } from "react-router-dom";
import { createFacility } from "./helper/adminapicalls";
import {
  Alert,
  Button,
  Paper,
  Select,
  Typography,
  MenuItem,
} from "@mui/material";
import "../styles.css";
import ResponsiveAppBar from "../core/components/AppBar";
import { getAllfctypes } from "../admin/helper/adminapicalls";
import { getAllfacilities } from "../admin/helper/adminapicalls";
import { appendFacility } from "./helper/adminapicalls";

const paperstyle = {
  padding: "4%",
  margin: "0 auto 10% auto",
};

const AppendFacility = () => {
  const [values, setValues] = useState({
    count: "",
    fcname: "",
    facilityId: "",
  });
  const [fctypes, setFctypes] = useState([]);
  const [facilities, setFacilities] = useState([]);

  const { count, fcname, facilityId } = values;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllfctypes().then((data) => {
      if (data && data.err) {
        console.log(data.err);
      } else {
        console.log(data);
        setFctypes(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const preloadfc = () => {
    getAllfacilities().then((data) => {
      if (data && data.err) {
        console.log(data.err);
      } else {
        console.log(data);
        setFacilities(data);
      }
    });
  };

  useEffect(() => {
    preloadfc();
  }, []);

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
    appendFacility(facilityId, user._id, token, { fcname, count })
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
              Select the Facility
            </Typography>
            <Select
              value={facilityId}
              label="Facility"
              onChange={handleChange("facilityId")}
              style={{ width: "100%" }}
            >
              {facilities &&
                facilities.map((facility, index) => {
                  return (
                    <MenuItem key={index} value={facility._id}>
                      {facility.name}
                    </MenuItem>
                  );
                })}
            </Select>
            <Typography variant="h5" align="center">
              Select the fcType
            </Typography>
            <Select
              value={fcname}
              label="fcname"
              onChange={handleChange("fcname")}
              style={{ width: "100%" }}
            >
              {fctypes &&
                fctypes.map((fctype, index) => {
                  return (
                    <MenuItem key={index} value={fctype.name}>
                      {fctype.name}
                    </MenuItem>
                  );
                })}
            </Select>

            <input
              type="text"
              className="form-control my-3"
              onChange={handleChange("count")}
              required
              value={count}
            />

            <Button variant="outlined" onClick={onSubmit}>
              Append to Facility
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
        title="Update a Facility"
        description="Add a new fctypes to the Facilities"
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

export default AppendFacility;
