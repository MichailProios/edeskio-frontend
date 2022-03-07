import React from "react";

//Material-UI Styles
import { makeStyles, useTheme } from "@material-ui/styles";

import { Grid } from "@material-ui/core";

import Register from "../../components/Register/Register";

const useStyles = makeStyles((theme) => ({}));

const RegisterPage = () => {
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
          <Register />
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterPage;
