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
import { useDispatch } from "react-redux";

import AssignmentLateIcon from "@material-ui/icons/AssignmentLate";
import BlockIcon from "@material-ui/icons/Block";
import { useTheme } from "@material-ui/styles";
import { logoutUserAction } from "../../redux/user/userActions";

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

  buttons: {
    width: "100%",
  },
}));

const ApprovalNeeded = ({ status }) => {
  const styles = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleLogout = (e) => {
    dispatch(logoutUserAction());
  };

  if (status === null)
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
                  <Typography variant="h5">Join Request Pending</Typography>
                </CardContent>
                <CardActions>
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Button
                        onClick={handleRefresh}
                        variant="contained"
                        color="primary"
                        className={styles.buttons}
                      >
                        Refresh
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Button
                        onClick={handleLogout}
                        variant="contained"
                        color="primary"
                        className={styles.buttons}
                      >
                        Logout
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grow>
      </div>
    );
  else if (!status) {
    return (
      <div className={styles.root}>
        <Grow in={true} timeout={150}>
          <Grid container className={styles.gridRoot}>
            <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
              <Card className={styles.root} raised={true}>
                <div className={styles.mediaContainer}>
                  <BlockIcon
                    style={{
                      fontSize: "15rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                </div>
                <CardContent className={styles.content}>
                  <Typography variant="h5">Join Request Declined</Typography>
                </CardContent>
                <CardActions>
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Button
                        onClick={handleRefresh}
                        variant="contained"
                        color="primary"
                        className={styles.buttons}
                      >
                        Refresh
                      </Button>
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                      <Button
                        onClick={handleLogout}
                        variant="contained"
                        color="primary"
                        className={styles.buttons}
                      >
                        Logout
                      </Button>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grow>
      </div>
    );
  }
};

export default ApprovalNeeded;
