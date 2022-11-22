import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Base from "../core/components/Base";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import Alert from "@mui/material/Alert";
import { LinearProgress } from "@mui/material";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { login, authenticate, isAuthenticated } from "../auth/helper/user";

const paperStyle = {
  padding: 20,
  height: "50vh",
  width: "30vw",
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "#1bbd7e" };
const btnstyle = { margin: "8px 0" };

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, loading, error, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });

    login({ email, password })
      .then((data) => {
        console.log(data);
        if (data.err) {
          setValues({ ...values, error: data.err, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              didRedirect: true,
              loading: true,
            });
          });
        }
      })
      .catch(
        setValues({
          ...values,
          email: "",
          password: "",
          error: "Unable to Log In",
        })
      );
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <redirect to="/" />;
      }
    }

    if (isAuthenticated()) {
      return <Navigate to="/" />;
    }
  };

  const loadingMessage = () => {
    return loading && <LinearProgress />;
  };

  const errorMessage = () => {
    if (error) {
      return (
        <Alert severity="error">Error in Login to Account : {error}</Alert>
      );
    }
  };

  const loginForm = () => {
    return (
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <form>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Sign In</h2>
            </Grid>
            <TextField
              label="email"
              placeholder="Enter email"
              fullWidth
              required
              value={email}
              onChange={handleChange("email")}
            />
            <TextField
              label="Password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={handleChange("password")}
            />
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              onClick={onSubmit}
            >
              Sign in
            </Button>
            <Typography>
              Don't have an account?<Link href="/register">Register</Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    );
  };

  return (
    <Base title="Log In Page" description="the gate keeper of Booky !😁">
      {loadingMessage()}
      {errorMessage()}
      {performRedirect()}
      {loginForm()}
    </Base>
  );
}
