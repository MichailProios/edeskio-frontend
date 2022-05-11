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

import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import BlockIcon from "@material-ui/icons/Block";
import CircularLoading from "../../components/CircularLoading/CircularLoading";
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
    width: "100%",
    minWidth: "100%",
    height: "3.2em",
    fontSize: "1em",
    padding: "1em 1em",

    userSelect: "none",
    userDrag: "none",
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

const Unauthorized = ({ title }) => {
  const styles = useStyles();
  const theme = useTheme();

  const navigate = useNavigate();

  const loading = useSelector((state) => state.User.loading);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (title) {
    if (!loading) {
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
                    <Typography variant="h4" color="textPrimary">
                      Unauthorized!
                    </Typography>
                  </CardContent>
                  <CardActions className={styles.cardFooter}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={styles.backBtn}
                      onClick={handleGoBack}
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
    } else {
      return (
        <div className={styles.root}>
          <CircularLoading />
        </div>
      );
    }
  } else {
    if (!loading) {
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
                    <Typography variant="h4" color="textPrimary">
                      Unauthorized
                    </Typography>
                  </CardContent>
                  <CardActions className={styles.cardFooter}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={styles.backBtn}
                      onClick={handleGoBack}
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
    } else {
      return (
        <div className={styles.root}>
          <CircularLoading />
        </div>
      );
    }
  }
};

export default Unauthorized;
