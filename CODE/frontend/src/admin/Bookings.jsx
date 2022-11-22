import React, { useState, useEffect } from "react";
import Base from "../core/components/Base";
import { LinearProgress } from "@material-ui/core";
import ResponsiveAppBar from "../core/components/AppBar";
import { getAllBookings } from "./helper/adminapicalls";
import "../styles.css";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Bookings() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    getAllBookings()
      .then((response) => {
        console.log(response);
        if (response && response.err) {
          console.log(response.err);
        } else {
          setRows(response);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <>
        <Base title="All Bookings" description="See all the bookings here ;)">
          {rows === [] ? (
            <div>
              <LinearProgress />
              <Typography
                className="nobookings"
                align="center"
                variant="h2"
                onClick={() => {
                  console.log(rows);
                }}
              >
                No Bookings Yet
              </Typography>
            </div>
          ) : (
            <div>
              {
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="left">Booking ID</TableCell>
                        <TableCell align="left">user ID</TableCell>
                        <TableCell align="left">facility</TableCell>
                        <TableCell align="left">facilityfcType</TableCell>
                        <TableCell align="left">TimeIn</TableCell>
                        <TableCell align="left">TimeOut</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="left">{row.reservation}</TableCell>
                          <TableCell align="left">{row.user}</TableCell>
                          <TableCell align="left">{row.facilityname}</TableCell>
                          <TableCell align="left">
                            {row.facilityfcType}
                          </TableCell>
                          <TableCell align="left">{row.timeinhrs}</TableCell>
                          <TableCell align="left">{row.timeouthrs}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              }
            </div>
          )}
        </Base>
      </>
    </div>
  );
}
