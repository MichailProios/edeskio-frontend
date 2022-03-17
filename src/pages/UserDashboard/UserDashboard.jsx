// Basic Dependencies
import React, { useEffect, useState } from "react";

// Material-UI Styles
import { makeStyles } from "@material-ui/styles";

// Material-UI
import { Grid, Grow } from "@material-ui/core";
import UserSubmitNewTicketButton from "./UserSubmitNewticketButton";
import UserViewTicketsButton from "./UserViewTicketsButton";

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
const UserDashboard = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      {/*<PageHeader title="" />*/}
      <Grid container spacing={4} className={styles.gridRoot}>
        <Grow in={true} timeout={100}>
          <Grid item>
            <UserSubmitNewTicketButton />
          </Grid>
        </Grow>
        <Grow in={true} timeout={200}>
          <Grid item>
          <UserViewTicketsButton />
          </Grid>
        </Grow>
      </Grid>
    </div>
  );
};
/*****************************************************************************************************************/

export default UserDashboard;
