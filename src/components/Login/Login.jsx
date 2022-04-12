import React, { useState } from "react";

//Material-UI Styles
import { makeStyles, useTheme } from "@material-ui/styles";

import {
  Paper,
  Grid,
  TextField,
  Divider,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";

import { postUserLoginAction } from "../../redux/user/userActions";

import MuiImage from "material-ui-image";

import logofull from "../../utilities/images/Logos/logo-full.png";

const useStyles = makeStyles((theme) => ({
  loginRoot: { width: "30em", height: "40em" },
  loginLogoGridContainer: { padding: "1em" },
  loginFormGridContainer: { marginTop: "0.5em" },

  loginRememberMeCheckbox: { marginLeft: "2.3em", userSelect: "none" },

  loginLinksGridContainer: { marginTop: "0.5em" },

  loginFooterGridContainer: { marginTop: "1em" },

  loginSignInButton: {
    width: "80%",
    userSelect: "none",
    userDrag: "none",
  },

  loginTextfields: {
    width: "80%",
    userSelect: "none",
    userDrag: "none",
  },

  loginCopyrightText: {
    userSelect: "none",
    userDrag: "none",
    // width: "100%",
  },

  loginForgotLink: { userSelect: "none", userDrag: "none", marginLeft: "3em" },

  loginSignUpLink: {
    cursor: "pointer",
    userSelect: "none",
    userDrag: "none",
    marginRight: "3em",
  },

  loginLogo: {
    // margin: "1em",
    // padding: "1em",
    userSelect: "none",
    userDrag: "none",
  },
}));

const Login = ({ handleRegister }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username.length > 0 && password.length > 0) {
      dispatch(postUserLoginAction(username, password));
    }
    setUsername("");
    setPassword("");
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="row"
        className={styles.loginLogoGridContainer}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <MuiImage
            aspectRatio={1.5}
            src={logofull}
            cover={true}
            animationDuration={100}
            className={styles.loginLogo}
          />
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        spacing={1}
        direction="row"
        className={styles.loginFormGridContainer}
      >
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
          <TextField
            label="Username"
            variant="outlined"
            required={true}
            value={username}
            onChange={handleUsername}
            className={styles.loginTextfields}
          />
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
          <TextField
            label="Password"
            variant="outlined"
            required={true}
            type="password"
            value={password}
            onChange={handlePassword}
            className={styles.loginTextfields}
            onKeyDown={(e) => e.keyCode === 13 && handleLogin()}
          />
        </Grid>
        <Grid
          container
          item
          justifyContent="flex-start"
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
        >
          <FormControlLabel
            className={styles.loginRememberMeCheckbox}
            control={<Checkbox name="checked" />}
            label="Remember Me"
          />
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            className={styles.loginSignInButton}
          >
            Sign In
          </Button>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
        direction="row"
        className={styles.loginLinksGridContainer}
      >
        <Grid
          container
          item
          justifyContent="flex-start"
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <Typography className={styles.loginForgotLink}>
            <Link href="">Forgot Password?</Link>
          </Typography>
        </Grid>
        <Grid
          container
          item
          justifyContent="flex-end"
          xs={6}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <Typography className={styles.loginSignUpLink}>
            <Link onClick={handleRegister}>Sign Up</Link>
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
        direction="row"
        className={styles.loginFooterGridContainer}
      >
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
          <Typography className={styles.loginCopyrightText}>
            Copyright © E-Deskio 2022
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
