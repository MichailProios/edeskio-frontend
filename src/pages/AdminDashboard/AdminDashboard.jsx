// Basic Dependencies
import React, { useEffect, useState } from "react";

// Material-UI Styles
import { makeStyles } from "@material-ui/styles";

// Material-UI
import { Grid, Grow } from "@material-ui/core";
import TechDashboardButton from "./TechDashboardButton";
import AdminButton from "./AdminButton";

//Redux
//import { useSelector } from "react-redux";

//Set Styles
/******************************************************************************************************************/
const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1.5em",
    height: "100%",
  },

  gridRoot: {
    justifyContent: "center",
    alignItems: "center",
    height: "50%",
  },
}));

/******************************************************************************************************************/

//Main component
/******************************************************************************************************************/
const AdminDashboard = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {/*<PageHeader title="" />*/}
      <Grid container spacing={4} className={styles.gridRoot}>
        <Grow in={true} timeout={100}>
          <Grid item>
            <TechDashboardButton />
          </Grid>
        </Grow>
        <Grow in={true} timeout={200}>
          <Grid item>
            <AdminButton />
          </Grid>
        </Grow>
      </Grid>
    </div>
  );
};
/*****************************************************************************************************************/

export default AdminDashboard;
