import React from "react";
import { Grid, Typography } from "@mui/material";

const AdminDashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h3" color="initial" align="center">
          Admin Dashboard
        </Typography>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
