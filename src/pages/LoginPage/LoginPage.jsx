import React from "react";

//Material-UI Styles
import { makeStyles, useTheme } from "@material-ui/styles";

import { Grid } from "@material-ui/core";

import Login from "../../components/Login/Login";

const useStyles = makeStyles((theme) => ({}));

const LoginPage = () => {
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
          <Login />
        </Grid>
      </Grid>
    </>
  );
};

export default LoginPage;