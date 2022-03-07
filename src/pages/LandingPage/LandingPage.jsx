import React, { useState, useEffect } from "react";

//Material-UI Styles
import { makeStyles, useTheme } from "@material-ui/styles";

import { Slide, Paper, Grid } from "@material-ui/core";

import Register from "../../components/Register/Register";

import Login from "../../components/Login/Login";

const useStyles = makeStyles((theme) => ({
  root: { width: "30em", height: "40em", overflow: "hidden" },
}));

const LandingPage = () => {
  const styles = useStyles();
  const [register, setRegister] = useState(false);
  const [initialSlideFlag, setInitialSlideFlag] = useState(false);

  const handleRegisterBack = () => {
    setRegister(false);
  };

  const handleRegister = () => {
    setRegister(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialSlideFlag(true);
    }, 1);

    return () => clearTimeout(timer);
  }, []);

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
};

export default LandingPage;
