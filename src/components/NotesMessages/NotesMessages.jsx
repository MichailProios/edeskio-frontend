import React, { useState, useEffect } from "react";
import {
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  IconButton,
  Grow,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  Chip,
  ListItemText,
  Button,
  Divider,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Tabs,
  Tab,
  Paper,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import moment from "momnet";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import AssignToTechnician from "../AssignToTechnician/AssignToTechnician";

import Notes from "./Notes";

const useStyles = makeStyles((theme) => ({
  disabledField: {
    width: "100%",
    color: "#000",
    "&disabled": {
      borderColor: "red",
    },
  },
  userInfoGridRoot: {
    justifyContent: "center,",
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
  },
  NotesMessagesDialog: {
    paddingBottom: "1.5em",
  },
  cardHeader: {
    textAlign: "center",
  },

  inputField: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      fontSize: ".85em",
    },
  },
  chipField: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      fontSize: ".85em",
    },
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
    paddingBottom: "10px",
  },
  queryButton: {
    backgroundColor: theme.palette.primary.main,
    color: "#f3f3f3",
    width: "100%",

    // "&:hover": {
    //   backgroundColor: theme.palette.button.hover,
    // },
  },

  formControl: {
    width: "100%",
  },

  costCalculationContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  operatorTypography: {
    margin: ".5em",
  },

  assignBtn: {
    // width: "100%",
    // backgroundColor: theme.palette.primary.main,
    // color: "#f3f3f3",
    // border: "solid 1px",
    // borderColor: theme.palette.primary.main,
    // "&:hover": {
    //   backgroundColor: theme.palette.button.hover,
    // },
  },
  cancelBtn: {
    //width: "100%",
    // backgroundColor: "white",
    // color: theme.palette.primary.main,
    // border: "solid 1px",
    // borderColor: theme.palette.primary.main,
    // "&:hover": {
    //   backgroundColor: theme.palette.button.hover,
    // },
  },
  chipField: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },

  outGrid: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

const TabPanel = ({ children, value, index }) => {
  return <div hidden={value !== index}>{children}</div>;
};

const NotesMessages = ({
  open,
  handleOpen,
  handleClose,
  ticketID,
}) => {
  // create dispatch
  const dispatch = useDispatch();

  const styles = useStyles();

  const [value, setValue] = useState(0);

  const userRole = useSelector((state) => state.User.user.tblAccess.RoleName);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleCancel = () => {
    setValue(0);
    handleClose();
  };


  //if (!loading) {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth={true}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {userRole === "Admin" || userRole === "Tech" ? "Ticket Messages and Notes" : "Ticket Messages"}
        <IconButton
          aria-label="close"
          className={styles.closeButton}
          onClick={handleCancel}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.NotesMessagesDialog}>
        <Grid container spacing={2} className={styles.userInfoGridRoot}>
          <Grow in={true} timeout={300}>
            <Grid
              container
              item
              justifyContent="center"
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              spacing={2}
            >
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
                <Paper elevation={1}>
                    <Tabs
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                      //scrollButtons="on"
                      value={value}
                      onChange={handleChange}
                    >
                    <Tab label="Messages" />
                    {userRole === "Admin" || userRole === "Tech" ? <Tab label="Notes" /> : ""}
                    </Tabs>
                </Paper>

                <TabPanel value={value} index={0}>
                    {/* <Messages grow={value === 0 ? true : false} /> */}
                </TabPanel>
                {userRole === "Admin" || userRole === "Tech" ? (
                <TabPanel value={value} index={1}>
                    <Notes 
                        grow={value === 0 ? true : false} 
                        ticketID={ticketID}
                    />
                </TabPanel> 
                ) : "" }

                {/* <ScrollToTopFAB /> */}
              </Grid>
            </Grid>
          </Grow>
          <Grid container item justifyContent="flex-end" spacing={1}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                className={styles.cancelBtn}
                onClick={handleCancel}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NotesMessages;
