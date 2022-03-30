import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MaterialTable from "@material-table/core";

import { tableIcons } from "../../utilities/DataTable/DataTableIcons.jsx";

import {
  Grow,
  Grid,
  IconButton,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import { palette } from "@material-ui/system";

import { makeStyles } from "@material-ui/styles";
import TicketCard from "../../components/Tickets/TicketCard.jsx";

import PageHeader from "../../components/PageHeader/PageHeader";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5em",
  },
}));
const ResolveSumbittedTickets = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  return (
    <div className={styles.root}>
      <PageHeader title="Resolve Tickets" />
      <Grid container spacing={2}>
        <Grow in={true} timeout={100}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TicketCard
              ticket={{ Subject: "test", ID: 1, Description: "this is a test" }}
            />
          </Grid>
        </Grow>

        <Grow in={true} timeout={300}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TicketCard
              ticket={{ Subject: "test", ID: 1, Description: "this is a test" }}
            />
          </Grid>
        </Grow>

        <Grow in={true} timeout={600}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TicketCard
              ticket={{ Subject: "test", ID: 1, Description: "this is a test" }}
            />
          </Grid>
        </Grow>
      </Grid>
    </div>
  );
};

export default ResolveSumbittedTickets;
