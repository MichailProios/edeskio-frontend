//Basic Dependencies
import React from "react";

// Material-UI
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Grow,
  CircularProgress,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

//Set Home Styles
/******************************************************************************************************************/
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5em",
    paddingTop: "12em",
    userSelect: "none",
    userDrag: "none",
  },
}));

const CircularLoading = () => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Grow in={true} timeout={150}>
        <Grid container spacing={1} className={styles.gridRoot}>
          <Grid container item justifyContent="center">
            <CircularProgress color="primary" size="4rem" />
          </Grid>
          <Grid container item justifyContent="center">
            <Typography variant="subtitle2" color="textSecondary">
              Loading, Please Wait...
            </Typography>
          </Grid>
        </Grid>
      </Grow>
    </div>
  );
};

export default CircularLoading;
