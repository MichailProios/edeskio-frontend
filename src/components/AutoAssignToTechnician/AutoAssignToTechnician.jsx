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
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import moment from "momnet";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { putTicketsAutoAssignAction } from "../../redux/user/userActions";

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
  AutoAssignToTechnicianDialog: {
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

const AutoAssignToTechnician = ({ open, handleOpen, handleClose, ticketID }) => {
  // create dispatch
  const dispatch = useDispatch();

  const styles = useStyles();

  const [includeAdminsOption, setIncludeAdminsOption] = useState("false");
  const [factorOpenTicketsOption, setFactorOpenTicketsOption] = useState("false");

  const handleAutoAssign = () => {

    let caseNumber = 0;

    if (includeAdminsOption === "true" && factorOpenTicketsOption === "false")
    {
        caseNumber = 1;
    }
    else if (includeAdminsOption === "true" && factorOpenTicketsOption === "true")
    {
        caseNumber = 2;
    }
    else if (includeAdminsOption === "false" && factorOpenTicketsOption === "false")
    {
        caseNumber = 3;
    }
    else if (includeAdminsOption === "false" && factorOpenTicketsOption === "true")
    {
        caseNumber = 4;
    }
    else
    {
        return;
    }

    dispatch(
        putTicketsAutoAssignAction(
            ticketID,
            caseNumber,
            moment().format("YYYY-MM-DD HH:mm:ss")
        )
    );
  };

  const handleIncludeAdminsOption = (e) => {
    setIncludeAdminsOption(e.target.value);
  }

  const handleFactorOpenTicketsOption = (e) => {
    setFactorOpenTicketsOption(e.target.value);
}

  const handleCancel = () => {
    setIncludeAdminsOption("false");
    setFactorOpenTicketsOption("false");
    handleClose();
  };

  //const users = useSelector((state) => state.User.users.tblUsers); 
  const tblTags = useSelector((state) => state.User.tags);

  const techs = useSelector((state) => state.User.techs); 
  const techExpertiseTags = useSelector((state) => state.User.expertiseTags_All); 
  const techsTicketCount = useSelector((state) => state.User.techsTicketCount);

  //if (!loading) {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth={true}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Auto-Assign Ticket
        <IconButton
          aria-label="close"
          className={styles.closeButton}
          onClick={handleCancel}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.AutoAssignToTechnicianDialog}>
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
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Include Admins?</FormLabel>
                        <RadioGroup aria-label="includeAdmins" name="includeAdmins" value={includeAdminsOption} onChange={handleIncludeAdminsOption}>
                            <FormControlLabel value={"false"} control={<Radio />} label="Include Only Techs" />
                            <FormControlLabel value={"true"} control={<Radio />} label="Include Techs and Admins" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Use Open Tickets Number?</FormLabel>
                            <RadioGroup aria-label="includeAdmins" name="includeAdmins" value={factorOpenTicketsOption} onChange={handleFactorOpenTicketsOption}>
                                <FormControlLabel value={"false"} control={<Radio />} label="Omit Open Tickets" />
                                <FormControlLabel value={"true"} control={<Radio />} label="Factor in Open Tickets" />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
          </Grow>
          <Grid container item justifyContent="flex-end" spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={styles.assignBtn}
                onClick={handleAutoAssign}
              >
                Auto-Assign
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                className={styles.cancelBtn}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
  //   } else {
  //     return (
  //       <Dialog
  //         open={open}
  //         onClose={handleClose}
  //         fullWidth={true}
  //         aria-labelledby="form-dialog-title"
  //       >
  //         <DialogTitle id="form-dialog-title">Expertise Tags</DialogTitle>
  //         <IconButton
  //           aria-label="close"
  //           className={styles.closeButton}
  //           onClick={handleClose}
  //         >
  //           <CloseIcon />
  //         </IconButton>
  //         <DialogContent className={styles.AutoAssignToTechnicianDialog}>
  //           <Grow in={true} timeout={300}>
  //             <Grid item>
  //               <Typography component="div" variant="h3">
  //                 <Skeleton animation="wave" />
  //               </Typography>
  //             </Grid>
  //           </Grow>
  //           <Grow in={true} timeout={300}>
  //             <Grid item>
  //               <Typography component="div" variant="h3">
  //                 <Skeleton animation="wave" />
  //               </Typography>
  //             </Grid>
  //           </Grow>
  //           <Grow in={true} timeout={600}>
  //             <Grid item>
  //               <Typography component="div" variant="h3">
  //                 <Skeleton animation="wave" />
  //               </Typography>
  //             </Grid>
  //           </Grow>
  //           <Grow in={true} timeout={900}>
  //             <Grid item>
  //               <Typography component="div" variant="h3">
  //                 <Skeleton animation="wave" />
  //               </Typography>
  //             </Grid>
  //           </Grow>
  //         </DialogContent>
  //       </Dialog>
  //     );
  //   }
};

export default AutoAssignToTechnician;
