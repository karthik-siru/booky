import React, { useState, useEffect } from "react";
import Base from "../core/components/Base";
import { Link } from "react-router-dom";
import {
  getAllfacilities,
  deleteFacility,
} from "../admin/helper/adminapicalls";
import { isAuthenticated } from "../auth/helper/user";
import { Paper, Typography, Button } from "@mui/material";
import ResponsiveAppBar from "../core/components/AppBar";

const paperstyle = {
  padding: "4%",
  width: "30vw",
  margin: "0 auto 10% auto",
};

const Managefacilities = () => {
  const [facilities, setFacilities] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
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
    preload();
  }, []);

  const deleteMyFacility = (fcId) => {
    deleteFacility(fcId, user._id, token).then((data) => {
      if (data && data.err) {
        console.log(data.err, "..amhs");
      } else {
        preload();
      }
    });
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Base title="Welcome admin" description="Manage facilities  here">
        <Typography variant="h4" align="center">
          All Facilities
        </Typography>

        <Paper elevation={10} style={paperstyle}>
          <Button variant="contained" color="success">
            <Link className="linku" to={`/admin/dashboard`}>
              Admin Home
            </Link>
          </Button>
          <div className="row">
            <div className="col-12">
              {facilities &&
                facilities.map((facility, index) => {
                  return (
                    <div key={index} className="row text-center mb-2 ">
                      <Typography variant="h6">{facility.name}</Typography>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          deleteMyFacility(facility._id);
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  );
                })}
            </div>
          </div>
        </Paper>
      </Base>
    </div>
  );
};

export default Managefacilities;
