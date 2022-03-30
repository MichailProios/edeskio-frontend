import React from "react";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Grow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import { useTheme } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5em",
  },
  gridRoot: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  //   root: {
  //     margin: "2.5em",

  //     [theme.breakpoints.down("md")]: {
  //       margin: "1em",
  //     },
  //   },
  media: {
    width: "100%",
  },
  backBtn: {
    // backgroundColor: theme.palette.button.main,
    width: "auto",
    minWidth: "100%",
    height: "3.2em",
    fontSize: "1em",
    padding: "1em 1em",
    color: "#f3f3f3",
    userSelect: "none",
    userDrag: "none",

    // "&:hover": {
    //   backgroundColor: theme.palette.button.hover,
    // },
  },
  cardFooter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    userSelect: "none",
  },

  mediaContainer: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
  },
}));

const ApprovalNeeded = () => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <div className={styles.root}>
      <Grow in={true} timeout={150}>
        <Grid container className={styles.gridRoot}>
          <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
            <Card className={styles.root} raised={true}>
              <div className={styles.mediaContainer}>
                <AssignmentLateIcon
                  style={{
                    fontSize: "15rem",
                    color: theme.palette.primary.main,
                  }}
                />
              </div>
              <CardContent className={styles.content}>
                <Typography variant="h5">
                  Approval Needed by Organization
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grow>
    </div>
  );
};

export default ApprovalNeeded;
