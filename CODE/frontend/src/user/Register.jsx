import { useState } from "react";
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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { register } from "../auth/helper/user";
import Alert from "@mui/material/Alert";

const paperStyle = {
  padding: 20,
  height: "50vh",
  width: "30vw",
  margin: "20px auto",
};
const avatarStyle = { backgroundColor: "blue" };
const btnstyle = { margin: "8px 0" };

export default function Register() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    register({ name, email, password })
      .then((data) => {
        if (data.err) {
          setValues({ ...values, error: data.err, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "Unable to Register user",
          success: "",
        })
      );
  };

  const RegisterForm = () => {
    return (
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <form>
            <Grid align="center">
              <Avatar style={avatarStyle}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Register</h2>
            </Grid>
            <TextField
              label="name"
              placeholder="Enter name"
              fullWidth
              required
              value={name}
              onChange={handleChange("name")}
            />
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
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
              onClick={onSubmit}
            >
              Register
            </Button>
            <Typography>
              Already have an account?<Link href="/login">Log In</Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    );
  };

  const successMessage = () => {
    if (success) {
      return (
        <Alert severity="success">
          Hurray !!! Sucessfully Created a account. Please Log In.
        </Alert>
      );
    }
  };

  const errorMessage = () => {
    return (
      error && (
        <Alert severity="error">Error in creating Account : {error}</Alert>
      )
    );
  };

  return (
    <Base
      title="Registration Page"
      description="One step away from Booky World 🐣"
    >
      {successMessage()}
      {errorMessage()}
      {RegisterForm()}
    </Base>
  );
}
