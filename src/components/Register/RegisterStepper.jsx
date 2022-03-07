import React from "react";

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
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Slide,
} from "@material-ui/core";

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

  loginSignUpLink: { userSelect: "none", userDrag: "none", marginRight: "3em" },

  loginLogo: {
    // margin: "1em",
    // padding: "1em",
    userSelect: "none",
    userDrag: "none",
  },
}));

const RegisterStepper = () => {
  const styles = useStyles();

  return (
    <>
      <h1>test</h1>
    </>
  );
};

export default RegisterStepper;
