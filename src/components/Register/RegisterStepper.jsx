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

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
};

const getSteps = () => {
  return ["Name", "Contact Information", "Address", "Inquiry"];
};

const RegisterStepper = () => {
  const styles = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
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
            <Typography className={styles.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={styles.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={styles.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={styles.button}
              >
                Back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={styles.button}
                >
                  Skip
                </Button>
              )}

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={styles.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RegisterStepper;
