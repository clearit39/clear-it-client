import React from "react";
import { Route, Navigate } from "react-router-dom";
import { isAutheticated } from "./index";
import Sidebar from "../../Admin/SideBar";
import { Grid, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { auto } from "@popperjs/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: "100px",
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

const AdminRoute = ({children}) => {
  const classes = useStyles();
  const auth = true;
  console.log(children);
  return (
    auth ? (
                <Grid container className={classes.paper} spacing={3}>
            <Grid item xs={12} md={2}>
              <Sidebar />
            </Grid>
            <Grid item xs={12} md={9}>
              <Container>
                {children}
              </Container>
            </Grid>
          </Grid>
    ) : (
      <Navigate to="/login" />
    )
  );
};

export default (AdminRoute);
