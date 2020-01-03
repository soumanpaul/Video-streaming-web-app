import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddBoxIcon from '@material-ui/icons/AddBox'
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import Button from "@material-ui/core/Button";
import auth from "../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {color: '#f99085'}
  else
    return {color: '#efdcd5'}
}
const Menu = withRouter(({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography type="title" color="inherit">
        MERN Social
      </Typography>
      <Link to="/">
        <IconButton aria-label="Home" style={isActive(history, "/")}>
          <HomeIcon />
        </IconButton>
      </Link>
      <Link to="/users">
        <Button style={isActive(history, "/users")}>Users</Button>
      </Link>
      {!auth.isAuthenticated() && (
        <span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}>Sign up</Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}>Sign In</Button>
          </Link>
        </span>
      )}
      {auth.isAuthenticated() && (
        <span>
          <Link to="/media/new">
            <Button style={isActive(history, "/media/new")}>
              <AddBoxIcon style={{ marginRight: "8px" }} /> Add Media
            </Button>
          </Link>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button
              style={isActive(
                history,
                "/user/" + auth.isAuthenticated().user._id
              )}
            >
              My Profile
            </Button>
          </Link>
          <Button
            color="inherit"
            onClick={() => {
              auth.signout(() => history.push("/"));
            }}
          >
            Sign out
          </Button>
        </span>
      )}
    </Toolbar>
  </AppBar>
));

export default Menu;
