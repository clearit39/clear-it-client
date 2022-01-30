import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAutheticated } from "./index";
import Sidebar from "../../Admin/SideBar";
import { Grid, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { auto } from "@popperjs/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: "10px",
    paddingBottom: "70px",
    marginRight: auto,
    marginLeft: auto,
    minHeight: "100vh",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "60px",
      paddingBottom: "50px",
    },
  },
}));

const TeacherRoute = ({ component: Component, ...rest }) => {
  const classes = useStyles();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAutheticated() && isAutheticated().user.role === 1 ? (
          <Grid container className={classes.paper} spacing={3}>
            <Grid item xs={12} md={2}>
              <Sidebar />
            </Grid>
            <Grid item xs={12} md={9}>
              <Container>
                <Component {...props} />
              </Container>
            </Grid>
          </Grid>
        ) : (
          <Navigate to="/signin" />
        )
      }
    />
  );
};

export default TeacherRoute;
