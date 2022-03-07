import React, { useState, useEffect } from "react";

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

import MuiImage from "material-ui-image";

import logoOnly from "../../utilities/images/Logos/logo-only.png";

import RegisterStepper from "./RegisterStepper";

const useStyles = makeStyles((theme) => ({
  registerRoot: { width: "30em", height: "40em", overflow: "hidden" },

  registerCard: { height: "auto", width: "80%" },

  registerCardAction: { height: "13em" },

  registerLogoGridContainer: {},

  registerTilesGridContainer: {
    marginTop: "0.5em",
  },

  registerFooterGridContainer: { marginTop: "1.2em" },

  registerLogo: {
    // padding: "1em",
    userSelect: "none",
    userDrag: "none",
  },

  registerCopyrightText: {
    userSelect: "none",
    userDrag: "none",
    // width: "100%",
  },

  registerPreviousButton: {
    width: "80%",
    userSelect: "none",
    userDrag: "none",
  },
}));

const Register = ({ handleRegisterBack }) => {
  const styles = useStyles();

  const [registerAndJoin, setRegisterAndJoin] = useState(false);
  const [initialSlideFlag, setInitialSlideFlag] = useState(false);

  const handleRegisterAndJoinBack = () => {
    setRegisterAndJoin(false);
  };

  const handleRegisterAndJoin = () => {
    setRegisterAndJoin(true);
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
        direction="row"
        className={styles.registerLogoGridContainer}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <MuiImage
            imageStyle={{
              width: "150px",
              height: "auto",
              marginLeft: "10em",
            }}
            aspectRatio={3}
            src={logoOnly}
            cover={true}
            animationDuration={100}
            className={styles.registerLogo}
          />
        </Grid>
      </Grid>
      <Divider />

      <Grid
        container
        spacing={2}
        direction="row"
        className={styles.registerTilesGridContainer}
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
          <Button
            variant="contained"
            color="primary"
            className={styles.registerPreviousButton}
            onClick={
              registerAndJoin ? handleRegisterAndJoinBack : handleRegisterBack
            }
          >
            {registerAndJoin ? "Back to Previous Selection" : "Back to Sign In"}
          </Button>
        </Grid>
      </Grid>
      {!registerAndJoin && (
        <Slide
          in={!registerAndJoin}
          direction={initialSlideFlag ? "right" : "left"}
          mountOnEnter
          unmountOnExit
        >
          <div>
            <Grid
              container
              spacing={2}
              direction="row"
              className={styles.registerTilesGridContainer}
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
                <Card className={styles.registerCard}>
                  <CardActionArea
                    className={styles.registerCardAction}
                    onClick={handleRegisterAndJoin}
                  >
                    {/* <CardMedia
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                /> */}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Register and Join Organization
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Create an account with E-Deskio and join your
                        organization
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
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
                <Card className={styles.registerCard}>
                  <CardActionArea className={styles.registerCardAction}>
                    {/* <CardMedia
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="Contemplative Reptile"
                /> */}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Register and Create Organization
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Create an account with E-Deskio and create an
                        organization
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Slide>
      )}
      {registerAndJoin && (
        <Slide
          in={registerAndJoin}
          direction={registerAndJoin ? "left" : "right"}
          mountOnEnter
          unmountOnExit
        >
          <div>
            <RegisterStepper />
          </div>
        </Slide>
      )}
      <Grid
        container
        spacing={0}
        direction="row"
        className={styles.registerFooterGridContainer}
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
          <Typography className={styles.registerCopyrightText}>
            Copyright © E-Deskio 2022
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
