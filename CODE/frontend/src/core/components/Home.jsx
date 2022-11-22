import React from "react";
import "../../styles.css";
import ResponsiveAppBar from "./AppBar";
import Base from "./Base";
import Footer from "./Footer";
import { Typography } from "@material-ui/core";

const Home = () => (
  <div>
    <ResponsiveAppBar />
    <Base title="Home Page">
      <div>
        <Typography variant="h5" align="center">
          Hi Welcome to Home Page of Booky
        </Typography>
      </div>
    </Base>
    <Footer />
  </div>
);

export default Home;
