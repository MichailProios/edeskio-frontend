import React, { useState } from "react";

//Material-UI Styles
import { makeStyles, useTheme } from "@material-ui/styles";

import { useSelector, useDispatch } from "react-redux";

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
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

import { postUserRegisterNewOrganizationAction } from "../../redux/user/userActions";

const useStyles = makeStyles((theme) => ({
  registerStepper: { userSelect: "none", userDrag: "none" },
  registerStepperContentGridContainer: {},
  registerStepperNextBackButtons: { width: "80%" },

  registerTextfields: {
    width: "80%",
    userSelect: "none",
    userDrag: "none",
  },
}));

const getStepContent = (
  step,
  styles,
  firstName,
  lastName,
  email,
  username,
  password,
  companyName,
  handleFirstName,
  handleLastName,
  handleEmail,
  handleUsername,
  handlePassword,
  handleCompanyName
) => {
  switch (step) {
    case 0:
      return (
        <>
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
            <TextField
              label="First Name"
              variant="outlined"
              required={true}
              value={firstName}
              onChange={handleFirstName}
              className={styles.registerTextfields}
            />
          </Grid>
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
            <TextField
              label="Last Name"
              variant="outlined"
              required={true}
              value={lastName}
              onChange={handleLastName}
              className={styles.registerTextfields}
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
              label="Organization Email Address"
              variant="outlined"
              required={true}
              value={email}
              onChange={handleEmail}
              className={styles.registerTextfields}
            />
          </Grid>
          {/* <Grid
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
              label="Personal Email Address"
              variant="outlined"
              required={false}
              className={styles.registerTextfields}
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
              label="Phone Number"
              variant="outlined"
              required={false}
              className={styles.registerTextfields}
            />
          </Grid> */}
        </>
      );
    case 1:
      return (
        <>
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
              onChange={handleUsername}
              value={username}
              className={styles.registerTextfields}
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
              onChange={handlePassword}
              value={password}
              className={styles.registerTextfields}
            />
          </Grid>
          {/* <Grid
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
              label="Re-Enter Password"
              variant="outlined"
              required={true}
              className={styles.registerTextfields}
            />
          </Grid> */}
        </>
      );
    case 2:
      return (
        <>
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
              label="Organization Name"
              variant="outlined"
              value={companyName}
              onChange={handleCompanyName}
              required={true}
              className={styles.registerTextfields}
            />
          </Grid>

          {/* <Grid
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
              label="Organization Domain"
              variant="outlined"
              required={true}
              className={styles.registerTextfields}
            />
          </Grid> */}
        </>
      );
    default:
      return "Unknown step";
  }
};

const temp = [
  { title: "Business1" },
  { title: "Business2" },
  { title: "Business3" },
];

const getSteps = () => {
  return ["Information", "Account", "Organization"];
};

const RegisterStepperCreate = ({ handleRegisterBack }) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleRegister = () => {
    dispatch(
      postUserRegisterNewOrganizationAction(
        email,
        username,
        password,
        firstName,
        lastName,
        companyName
      )
    );

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleCompanyName = (e) => {
    setCompanyName(e.target.value);
  };

  return (
    <>
      <Stepper activeStep={activeStep} className={styles.registerStepper}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Grid
              container
              spacing={1}
              direction="row"
              className={styles.loginLogoGridContainer}
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
                <Typography className={styles.instructions}>
                  Account Created
                </Typography>
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
                  onClick={handleRegisterBack}
                >
                  Back to Login
                </Button>
              </Grid>
            </Grid>
          </div>
        ) : (
          <Grid
            container
            spacing={1}
            direction="row"
            className={styles.registerStepperContentGridContainer}
          >
            {getStepContent(
              activeStep,
              styles,
              firstName,
              lastName,
              email,
              username,
              password,
              companyName,
              handleFirstName,
              handleLastName,
              handleEmail,
              handleUsername,
              handlePassword,
              handleCompanyName
            )}

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
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                className={styles.registerStepperNextBackButtons}
              >
                Back
              </Button>
            </Grid>
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
              <Button
                variant="contained"
                color="primary"
                onClick={
                  activeStep === steps.length - 1 ? handleRegister : handleNext
                }
                className={styles.registerStepperNextBackButtons}
              >
                {activeStep === steps.length - 1 ? "Register" : "Next"}
              </Button>
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
};

export default RegisterStepperCreate;
