import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Base = ({ title = "title", description = "description", children }) => (
  <div>
    <div padding="0px">
      <Box textAlign="center" px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }}>
        <Typography variant="h3" gutterBottom>
          {title}
        </Typography>
        <Typography color="grey" variant="h5" gutterBottom>
          {description}
        </Typography>
      </Box>
    </div>
    <div>{children}</div>
  </div>
);
export default Base;
