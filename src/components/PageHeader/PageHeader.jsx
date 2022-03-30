// Basic Dependencies
import React from "react";

// Material-UI Styles
import { makeStyles } from "@material-ui/styles";

// Material-UI Components
import {
  Paper,
  Box,
  Typography,
  Breadcrumbs,
  Grid,
  Fade,
} from "@material-ui/core";

import { useLocation, Link } from "react-router-dom";

import { emphasize, withStyles } from "@material-ui/core/styles";

import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import Chip from "@material-ui/core/Chip";

import useIsWidth from "../../utilities/customHooks/useIsWidth";

//Set PageHeader Styles
/******************************************************************************************************************/
const useStyles = makeStyles((theme) => ({
  gridRoot: {
    alignItems: "center",
  },

  moduleHeader: {
    width: "100%",
    marginBottom: "1em",
    textAlign: "center",
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    userSelect: "none",
    userDrag: "none",
  },
  headerText: {
    // background: "orange",
    userSelect: "none",
    userDrag: "none",
  },

  breadcrumb: {
    color: "#fff",
    textDecoration: "none",
    margin: "0.25em 1em",
    // background: "red",
  },
}));

/******************************************************************************************************************/

// function toTitleCase(str) {
//   return str.replace(/\b\w+/g, function (s) {
//     return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();
//   });
// }

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    userSelect: "none",
    userDrag: "none",
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300],
      cursor: "pointer",
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);

const Breadcrumb = () => {
  let location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const styles = useStyles();
  const isMobile = useIsWidth(1000);

  //change back to pathnames[0] === "Dashboard"
  if (location.pathname === "/") {
    return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        maxItems={4}
        className={styles.breadcrumb}
      >
        <StyledBreadcrumb key={0} component={Link} to="/" label="Dashboard" />
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <StyledBreadcrumb key={to} label={value} />
          ) : (
            <StyledBreadcrumb key={to} component={Link} to={to} label={value} />
          );
        })}
      </Breadcrumbs>
    );
  } else {
    return (
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        maxItems={isMobile === true ? 3 : 4}
        className={styles.breadcrumb}
      >
        {/* <StyledBreadcrumb key={0} component={Link} to="/" label="Modules" /> */}

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <StyledBreadcrumb key={to} label={capitalizeFirstLetter(value)} />
          ) : (
            <StyledBreadcrumb
              key={to}
              component={Link}
              to={to}
              label={capitalizeFirstLetter(value)}
            />
          );
        })}
      </Breadcrumbs>
    );
  }
};

//Main component
/******************************************************************************************************************/
const PageHeader = ({ title, showBreadcrumbs }) => {
  const styles = useStyles();
  const isMobile = useIsWidth();

  if (showBreadcrumbs === undefined) {
    showBreadcrumbs = true;
  }

  if (showBreadcrumbs === true && isMobile === false) {
    return (
      <Paper position="relative" elevation={8} className={styles.moduleHeader}>
        <Grid container spacing={0} className={styles.gridRoot}>
          <Grid
            container
            item
            xs={4}
            sm={4}
            md={4}
            lg={4}
            xl={4}
            justifyContent="flex-start"
          >
            <Breadcrumb className={styles.breadcrumb} />
          </Grid>
          <Fade in={true} timeout={150}>
            <Grid
              container
              item
              xs={4}
              sm={4}
              md={4}
              lg={4}
              xl={4}
              justifyContent="center"
            >
              <Typography variant="h4" className={styles.headerText}>
                <Box p={1} fontWeight="fontWeightMedium">
                  {title}
                </Box>
              </Typography>
            </Grid>
          </Fade>{" "}
        </Grid>
      </Paper>
    );
  } else if (showBreadcrumbs === true && isMobile === true) {
    //Add back button here
    return (
      <Paper position="relative" elevation={8} className={styles.moduleHeader}>
        <Grid container spacing={0} className={styles.gridRoot}>
          <Fade in={true} timeout={150}>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              justifyContent="center"
            >
              <Typography variant="h4" className={styles.headerText}>
                <Box p={1} fontWeight="fontWeightMedium">
                  {title}
                </Box>
              </Typography>
            </Grid>
          </Fade>
        </Grid>
      </Paper>
    );
  } else {
    return (
      <Paper position="relative" elevation={8} className={styles.moduleHeader}>
        <Grid container spacing={0} className={styles.gridRoot}>
          <Fade in={true} timeout={150}>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              justifyContent="center"
            >
              <Typography variant="h4" className={styles.headerText}>
                <Box p={1} fontWeight="fontWeightMedium">
                  {title}
                </Box>
              </Typography>
            </Grid>
          </Fade>
        </Grid>
      </Paper>
    );
  }
};
/******************************************************************************************************************/
export default PageHeader;
