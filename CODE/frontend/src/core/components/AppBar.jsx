import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, Navigate } from "react-router-dom";
import "../../styles.css";
import { isAuthenticated, logout } from "../../auth/helper/user";

const pages = ["OAT", "Big Data Lab", "SSL", "NSL"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <Link className="menu" to="/" exact>
                    Home
                  </Link>
                </Typography>
              </MenuItem>
              {/* {work to do here the facilities link } */}
              {isAuthenticated() &&
                isAuthenticated().user.role === 0 &&
                pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              {!isAuthenticated() && (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link className="menu" to="/login" exact>
                        Login
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link className="menu" to="/register" exact>
                        Register
                      </Link>
                    </Typography>
                  </MenuItem>
                </>
              )}
              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link className="menu" to="/admin/bookings" exact>
                        Bookings
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link className="menu" to="/admin/cancellations" exact>
                        Cancellations
                      </Link>
                    </Typography>
                  </MenuItem>
                </>
              )}
              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link className="menu" to="/booking/user" exact>
                        My Bookings
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link className="menu" to="/cart" exact>
                        Summary
                      </Link>
                    </Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <Link className="linku" to="/" exact>
                Home
              </Link>
            </Button>
            {!isAuthenticated() && (
              <>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link className="linku" to="/login" exact>
                    Login
                  </Link>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link className="linku" to="/register" exact>
                    Register
                  </Link>
                </Button>
              </>
            )}
            {isAuthenticated() &&
              isAuthenticated().user.role === 0 &&
              pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
              <>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link className="linku" to="/admin/bookings" exact>
                    Bookings
                  </Link>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link className="linku" to="/admin/cancellations" exact>
                    Cancellations
                  </Link>
                </Button>
              </>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
              <>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link className="linku" to="/booking/user" exact>
                    My Bookings
                  </Link>
                </Button>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  <Link className="linku" to="/cart" exact>
                    Summary
                  </Link>
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {isAuthenticated() && (
                  <Avatar
                    alt={isAuthenticated().user.name}
                    src="/static/images/avatar/2.jpg"
                  />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    {" "}
                    <Link className="menu" to="/admin/dashboard" exact>
                      DashBoard
                    </Link>
                  </Typography>
                </MenuItem>
              )}
              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                    {" "}
                    <Link className="menu" to="/user/profile" exact>
                      Profile
                    </Link>
                  </Typography>
                </MenuItem>
              )}
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                  <span
                    className="menu"
                    onClick={() => {
                      logout(() => {
                        <Navigate to="/" />;
                      });
                    }}
                  >
                    LogOut
                  </span>
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
