import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Home from "./core/components/Home";
import Login from "./user/Login";
import Register from "./user/Register";
import PrivateRoute from "./auth/helper/private";
import AdminRoute from "./auth/helper/admin";
import Dashboard from "./admin/Dashboard";
import Bookings from "./admin/Bookings";
import Cancellations from "./admin/Cancellations";
import CreatefcTypes from "./admin/Createfctype";
import Createfacility from "./admin/createFacility";
import ManagefcTypes from "./admin/Managefctypes";
import Managefacilities from "./admin/ManageFacilities";
import AppendFacility from "./admin/AppendFacilityfctype";
import Profile from "./user/Profile";

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/admin/dashboard" exact element={<AdminRoute />}>
          <Route path="/admin/dashboard" exact element={<Dashboard />} />
        </Route>
        <Route path="/admin/bookings" exact element={<AdminRoute />}>
          <Route path="/admin/bookings" exact element={<Bookings />} />
        </Route>
        <Route path="/admin/cancellations" exact element={<AdminRoute />}>
          <Route
            path="/admin/cancellations"
            exact
            element={<Cancellations />}
          />
        </Route>
        <Route path="/fctype/create" exact element={<AdminRoute />}>
          <Route path="/fctype/create" exact element={<CreatefcTypes />} />
        </Route>
        <Route path="/facility/create" exact element={<AdminRoute />}>
          <Route path="/facility/create" exact element={<Createfacility />} />
        </Route>
        <Route path="/fctype/manage" exact element={<AdminRoute />}>
          <Route path="/fctype/manage" exact element={<ManagefcTypes />} />
        </Route>
        <Route path="/facility/manage" exact element={<AdminRoute />}>
          <Route path="/facility/manage" exact element={<Managefacilities />} />
        </Route>
        <Route path="/facility/appendfc" exact element={<AdminRoute />}>
          <Route path="/facility/appendfc" exact element={<AppendFacility />} />
        </Route>
        <Route path="/user/profile" exact element={<PrivateRoute />}>
          <Route path="/user/profile" exact element={<Profile />} />
        </Route>
      </Switch>
    </Router>
  );
}
