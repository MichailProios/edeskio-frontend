import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import BusinessIcon from "@material-ui/icons/Business";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LinearProgress from "@material-ui/core/LinearProgress";
import { MenuItem, Menu, Tooltip, Grid } from "@material-ui/core";

import { AccountCircle, LocalOffer } from "@material-ui/icons";

import { Link, useLocation } from "react-router-dom";

import logoOnly from "../../utilities/images/Logos/logo-only.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllTagsAction,
  getUserAction,
  getUsersAllAction,
} from "../../redux/user/userActions";

import ExpertiseTags from "../ExpertiseTags/ExpertiseTags";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: theme.palette.primary.dark,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appbarLink: {
    textDecoration: "none",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    userSelect: "none",
    userDrag: "none",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: "none",
  },
  loading: {
    zIndex: theme.zIndex.drawer + 5,
    height: "0.18em",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    //padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  logo: {
    width: "3.5rem",
    marginRight: "0.2em",
    height: "auto",
    userDrag: "none",
    userSelect: "none",
    alignSelf: "center",
  },
  headerText: {
    alignSelf: "center",
  },
  menuHeader: {
    userDrag: "none",
    userSelect: "none",
    marginRight: "2.3em",
  },
  options: {
    marginLeft: "auto",
  },

  accountIcon: {
    color: "#fff",
    fontSize: "1.2em",
    [theme.breakpoints.down("xs")]: {
      color: theme.palette.secondary.light,
      fontSize: "1.5em",
    },
  },

  accountButton: {
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      color: "rgba(0, 0, 0, 0.54)",
      fontSize: "1.5em",
    },
  },

  appbarUserText: {
    userSelect: "none",
  },
}));

const Navbar = ({ children }) => {
  const styles = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [openExpertiseTags, setOpenExpertiseTags] = useState(false);

  const user = useSelector((state) => state.User.user);

  // const user = useSelector(
  //   (state) =>
  //     state.User.user.tblUser.FirstName + " " + state.User.user.tblUser.LastName
  // );

  const organization = useSelector(
    (state) => state.User.user.tblOrganization.Name
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Fire to open drop down menu on user icon click
  const handleAccountClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  // Fire to close drop down menu on user icon click
  const handleAccountClose = (e) => {
    setAnchorEl(null);
  };

  const handleExpertiseTagsOpen = (e) => {
    setOpenExpertiseTags(true);
    setAnchorEl(null);
  };

  const handleExpertiseTagsClose = (e) => {
    setOpenExpertiseTags(false);
  };
  

  const handleProfileOpen = (e) => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.User.loading);

  const [selectedIndex, setSelectedIndex] = useState();
  const location = useLocation();

  useEffect(() => {
    const pathnames = location.pathname.toLowerCase();

    switch (true) {
      case pathnames === "/":
        setSelectedIndex(0);
        break;
      case pathnames.startsWith("/dashboard"):
        setSelectedIndex(0);
        break;
      case pathnames.startsWith("/organization"):
        setSelectedIndex(1);
        break;
      default:
        setSelectedIndex(null);
        break;
    }
  }, [location]);

  return (
    <div className={styles.root}>
      <AppBar
        position="fixed"
        className={clsx(styles.appBar, {
          [styles.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(styles.menuButton, open && styles.hide)}
          >
            <MenuIcon style={{ fontSize: "1.2em" }} />
          </IconButton>
          {/* <MuiImage
            imageStyle={{
              width: "70px",
              height: "auto",
              //   marginLeft: "10em",
            }}
            aspectRatio={25}
            src={logoOnly}
            cover={true}
            animationDuration={100}
            className={styles.registerLogo}
          /> */}
          <Link to="/" className={styles.appbarLink}>
            <img src={logoOnly} alt="logo" className={styles.logo} />
            <Typography variant="h6" noWrap className={styles.headerText}>
              E-Deskio | {organization}
            </Typography>
          </Link>

          <div className={styles.options}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <Typography className={styles.appbarUserText}>
                  Welcome {user.tblUser.FirstName + " " + user.tblUser.LastName}
                </Typography>
              </Grid>
              <Grid item>
                <IconButton
                  className={styles.accountButton}
                  onClick={handleAccountClick}
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                >
                  <Tooltip title="My Account" placement="bottom">
                    <AccountCircle className={styles.accountIcon} />
                  </Tooltip>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleAccountClose}
                  getContentAnchorEl={null}
                  anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                  transformOrigin={{ vertical: "top", horizontal: "center" }}
                >
                  <MenuItem onClick={handleProfileOpen}>
                    <ListItemIcon>
                      <AssignmentIndIcon className={styles.menuIcons} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" color="textPrimary">
                          My Profile
                        </Typography>
                      }
                    />
                  </MenuItem>
                  {user.tblAccess.RoleName === "Admin" || user.tblAccess.RoleName == "Tech" ? (
                    <MenuItem onClick={handleExpertiseTagsOpen}>
                    <ListItemIcon>
                      <LocalOffer className={styles.menuIcons} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" color="textPrimary">
                          Expertise Tags
                        </Typography>
                      }
                    />
                  </MenuItem>
                  ) : "" }

                  <MenuItem>
                    <ListItemIcon>
                      <ExitToAppIcon className={styles.menuIcons} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="body1" color="textPrimary">
                          Logout
                        </Typography>
                      }
                    />
                  </MenuItem>
                </Menu>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
        {loading === true && (
          <LinearProgress
            variant="indeterminate"
            color="primary"
            className={styles.loading}
          />
        )}
      </AppBar>
      <Drawer
        className={styles.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: styles.drawerPaper,
        }}
      >
        <div className={styles.drawerHeader}>
          <Typography className={styles.menuHeader} variant="h6" noWrap>
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            component={Link}
            to="/Dashboard"
            selected={selectedIndex === 0}
          >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/Organization"
            selected={selectedIndex === 1}
          >
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary={"Organization"} />
          </ListItem>
        </List>
        <Divider />
        {/* <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <ExpertiseTags
        open={openExpertiseTags}
        handleOpen={handleExpertiseTagsOpen}
        handleClose={handleExpertiseTagsClose}
      />

      <main
        className={clsx(styles.content, {
          [styles.contentShift]: open,
        })}
      >
        <div className={styles.drawerHeader} />
        {children}
      </main>
    </div>
  );
};

export default Navbar;
