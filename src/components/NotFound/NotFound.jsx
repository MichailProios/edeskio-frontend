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
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Link } from "react-router-dom";

import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import { useNavigate } from "react-router";
// import { ImOffice } from "react-icons/im";

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
    width: "auto",
    minWidth: "100%",
    height: "3.2em",
    fontSize: "1em",
    padding: "1em 1em",

    userSelect: "none",
    userDrag: "none",

    "&:hover": {
      backgroundColor: theme.palette.primary.hover,
    },
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
    userSelect: "none",
  },

  mediaContainer: {
    width: "80%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
  },
}));

const NotFound = ({ type }) => {
  const styles = useStyles();
  const theme = useTheme();

  const navigate = useNavigate();

  if (typeof type !== "undefined") {
    if (type === "home") {
      return (
        <div className={styles.root}>
          <Grow in={true} timeout={150}>
            <Grid container className={styles.gridRoot}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                <Card className={styles.root} raised={true}>
                  <div className={styles.mediaContainer}>
                    <ErrorOutlineIcon
                      style={{
                        fontSize: "15rem",
                        color: theme.palette.primary.main,
                      }}
                    />
                  </div>
                  <CardContent className={styles.content}>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      Page/Resource Not Found
                    </Typography>
                  </CardContent>
                  <CardActions className={styles.cardFooter}>
                    <Button
                      component={Link}
                      color="primary"
                      to={"/"}
                      variant="contained"
                      className={styles.backBtn}
                    >
                      Back to Home
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grow>
        </div>
      );
    } else if (type === "previous") {
      return (
        <div className={styles.root}>
          <Grow in={true} timeout={150}>
            <Grid container className={styles.gridRoot}>
              <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
                <Card className={styles.root} raised={true}>
                  <div className={styles.mediaContainer}>
                    <ErrorOutlineIcon
                      style={{
                        fontSize: "15rem",
                        color: theme.palette.primary.main,
                      }}
                    />
                  </div>
                  <CardContent className={styles.content}>
                    <Typography variant="h5" style={{ textAlign: "center" }}>
                      Page/Resource Not Found
                    </Typography>
                  </CardContent>
                  <CardActions className={styles.cardFooter}>
                    <Button
                      onClick={() => navigate(-2)}
                      color="primary"
                      variant="contained"
                      className={styles.backBtn}
                    >
                      Previous Page
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Grow>
        </div>
      );
    }
  } else {
    return (
      <div className={styles.root}>
        <Grow in={true} timeout={150}>
          <Grid container className={styles.gridRoot}>
            <Grid item xs={12} sm={8} md={6} lg={4} xl={4}>
              <Card className={styles.root} raised={true}>
                <div className={styles.mediaContainer}>
                  <ErrorOutlineIcon
                    style={{
                      fontSize: "15rem",
                      color: theme.palette.primary.main,
                    }}
                  />
                </div>
                <CardContent className={styles.content}>
                  <Typography variant="h5" style={{ textAlign: "center" }}>
                    Page/Resource Not Found
                  </Typography>
                </CardContent>
                <CardActions className={styles.cardFooter}>
                  <Button
                    component={Link}
                    color="primary"
                    to={"/"}
                    variant="contained"
                    className={styles.backBtn}
                  >
                    Back to Home
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grow>
      </div>
    );
  }
};

export default NotFound;
