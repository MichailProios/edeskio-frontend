// Basic Dependencies
import React, { useEffect, useState } from "react";

// Material-UI Styles
import { makeStyles } from "@material-ui/styles";

// Material-UI
import { Grid, Grow } from "@material-ui/core";
import SubmitNewTicketButton from "./SubmitNewticketButton";
import ViewSumbittedTicketsButton from "./ViewSumbittedTicketsButton";

import PageHeader from "../../components/PageHeader/PageHeader";
import PermissionsButton from "./PermissionsButton";
import JoinOrganizationRequestsButton from "./JoinOrganizationRequestsButton";
import ResolveSumbittedTicketsButton from "./ResolveSumbittedTicketsButton";

//Redux
//import { useSelector } from "react-redux";

//Set Styles
/******************************************************************************************************************/
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5em",
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
const Dashboard = () => {
  const styles = useStyles();

  if (false) {
    return (
      <div className={styles.root}>
        <PageHeader title="Dashboard" showBreadcrumbs={false} />
        <Grid container spacing={4} className={styles.gridRoot}>
          <Grow in={true} timeout={150}>
            <Grid item>
              <SubmitNewTicketButton />
            </Grid>
          </Grow>
          <Grow in={true} timeout={300}>
            <Grid item>
              <ViewSumbittedTicketsButton />
            </Grid>
          </Grow>
        </Grid>
      </div>
    );
  } else if (true) {
    return (
      <div className={styles.root}>
        <PageHeader title="Technician Dashboard" showBreadcrumbs={false} />
        <Grid container spacing={4} className={styles.gridRoot}>
          <Grow in={true} timeout={150}>
            <Grid item>
              <SubmitNewTicketButton />
            </Grid>
          </Grow>
          <Grow in={true} timeout={300}>
            <Grid item>
              <ResolveSumbittedTicketsButton />
            </Grid>
          </Grow>
        </Grid>
      </div>
    );
  } else {
    return (
      <div className={styles.root}>
        <PageHeader title="Admin Dashboard" showBreadcrumbs={false} />
        <Grid container spacing={4} className={styles.gridRoot}>
          <Grow in={true} timeout={150}>
            <Grid item>
              <SubmitNewTicketButton />
            </Grid>
          </Grow>
          <Grow in={true} timeout={300}>
            <Grid item>
              <ResolveSumbittedTicketsButton />
            </Grid>
          </Grow>
          <Grow in={true} timeout={300}>
            <Grid item>
              <JoinOrganizationRequestsButton />
            </Grid>
          </Grow>
          <Grow in={true} timeout={300}>
            <Grid item>
              <PermissionsButton />
            </Grid>
          </Grow>
        </Grid>
      </div>
    );
  }
};

/*****************************************************************************************************************/

export default Dashboard;
