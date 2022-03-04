import React from "react";

//Material-UI Styles
import { makeStyles, useTheme } from "@material-ui/styles";

import { Paper, Grid, TextField, Divider } from "@material-ui/core";

import MuiImage from "material-ui-image";

import logofull from "../../utilities/images/Logos/logo-full.png";

const useStyles = makeStyles((theme) => ({
  loginRoot: { width: "30em", height: "40em" },
  loginGridContainer: {},
  logo: {
    padding: "1em",
  },
}));

const Login = () => {
  const styles = useStyles();
  return (
    <>
      <Paper elevation={3} className={styles.loginRoot}>
        <Grid
          container
          spacing={0}
          direction="row"
          className={styles.loginGridContainer}
        >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <MuiImage
              //   imageStyle={{ width: "auto", height: "auto" }}
              aspectRatio={1.5}
              //iconContainerStyle={}
              src={logofull}
              cover={true}
              animationDuration={50}
              className={styles.logo}
            />
          </Grid>
          <Divider />
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Divider />
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <TextField label="Username" variant="outlined" />
          </Grid>
          <Grid
            container
            item
            justifyContent="center"
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <TextField label="Password" variant="outlined" />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Login;
