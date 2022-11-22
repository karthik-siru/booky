import React, { useState, useEffect } from "react";
import Base from "../core/components/Base";
import { Link } from "react-router-dom";
import { getAllfctypes, deletefcType } from "../admin/helper/adminapicalls";
import { isAuthenticated } from "../auth/helper/user";
import { Paper, Typography, Button } from "@mui/material";
import ResponsiveAppBar from "../core/components/AppBar";

const paperstyle = {
  padding: "4%",
  width: "30vw",
  margin: "0 auto 10% auto",
};

const ManagefcTypes = () => {
  const [fctypes, setFctypes] = useState([]);

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

  const deleteMyFcType = (fcId) => {
    deletefcType(fcId, user._id, token).then((data) => {
      if (data && data.err) {
        console.log(data.err);
      } else {
        preload();
      }
    });
  };

  return (
    <div>
      <ResponsiveAppBar />
      <Base title="Welcome admin" description="Manage fctypes  here">
        <Typography variant="h4" align="center">
          All FcTYpes
        </Typography>

        <Paper elevation={10} style={paperstyle}>
          <Button variant="contained" color="success">
            <Link className="linku" to={`/admin/dashboard`}>
              Admin Home
            </Link>
          </Button>
          <div className="row">
            <div className="col-12">
              {fctypes &&
                fctypes.map((fctype, index) => {
                  return (
                    <div key={index} className="row text-center mb-2 ">
                      <Typography variant="h6">{fctype.name}</Typography>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          deleteMyFcType(fctype._id);
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

export default ManagefcTypes;
