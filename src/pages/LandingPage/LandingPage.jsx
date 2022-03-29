import React, { useState, useEffect } from "react";

//Material-UI Styles
import { makeStyles, useTheme } from "@material-ui/styles";

import { Slide, Paper, Grid, CircularProgress } from "@material-ui/core";

import Register from "../../components/Register/Register";

import Login from "../../components/Login/Login";

import { useSelector, useDispatch } from "react-redux";
import { getUserOrganizationAction } from "../../redux/user/userActions";

const useStyles = makeStyles((theme) => ({
  root: { width: "30em", height: "40em", overflow: "hidden" },
}));

const LandingPage = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [register, setRegister] = useState(false);
  const [initialSlideFlag, setInitialSlideFlag] = useState(false);

  const loading = useSelector((state) => state.User.loginLoading);

  const handleRegisterBack = () => {
    setRegister(false);
  };

  const handleRegister = () => {
    setRegister(true);
  };

  useEffect(() => {
    dispatch(getUserOrganizationAction());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialSlideFlag(true);
    }, 1);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item>
            <Paper elevation={3} className={styles.root}>
              {register && (
                <Slide
                  in={register}
                  direction={register ? "left" : "right"}
                  mountOnEnter
                  unmountOnExit
                >
                  <div>
                    <Register handleRegisterBack={handleRegisterBack} />
                  </div>
                </Slide>
              )}

              {!register && (
                <Slide
                  in={!register}
                  direction={register ? "left" : "right"}
                  mountOnEnter
                  unmountOnExit
                  timeout={initialSlideFlag ? 250 : 0}
                >
                  <div>
                    <Login handleRegister={handleRegister} />
                  </div>
                </Slide>
              )}

              {!initialSlideFlag && <Login handleRegister={handleRegister} />}
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item>
            <Paper elevation={3} className={styles.root}>
              <Grid
                container
                item
                spacing={0}
                justifyContent="center"
                alignContent="center"
                style={{ height: "100%" }}
              >
                <CircularProgress size={60} />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default LandingPage;
