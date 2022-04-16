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
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

import Skeleton from "@material-ui/lab/Skeleton";

import CloseIcon from "@material-ui/icons/Close";

import moment from "momnet";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { getTechniciansAssignAction, putTicketsAssignAction } from "../../redux/user/userActions";

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
  AssignToTechnicianDialog: {
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

const AssignToTechnician = ({ open, handleOpen, handleClose, setSelected, ticketID, ticketTags }) => {
  // create dispatch
  const dispatch = useDispatch();

  const styles = useStyles();

  const [selectedTechID, setSelectedTechID] = useState("");

  const handleAssignTechnician = () => {

    if (selectedTechID !== "")
    {
      dispatch(
        putTicketsAssignAction(
          ticketID,
          selectedTechID,
          moment().format("YYYY-MM-DD HH:mm:ss")
        )
      );
    }
  };

  const handleCancel = () => {
    setSelectedTechID("");
    handleClose();
  };

  //const users = useSelector((state) => state.User.users.tblUsers); 
  const tblTags = useSelector((state) => state.User.tags.tblTags);

  const techs = useSelector((state) => state.User.techs); 
  const techExpertiseTags = useSelector((state) => state.User.expertiseTags_All); 
  const techsTicketCount = useSelector((state) => state.User.techsTicketCount);
  
  const techNumOfMatchingTags = (techID) => {
    let expertiseTags = [];
    
    techExpertiseTags.forEach((row) => {
      if( row.TechnicianID === techID )
      {
        expertiseTags.push(row.TagType);
      }
    });

    let numMatching = 0;

    expertiseTags.forEach((tag) => { if(ticketTags.includes(tag)) numMatching++; })

    return numMatching;
  }

  const techMatchingTagChips = (techID) => {
    let expertiseTags = [] 
    
    techExpertiseTags.forEach((row) => {
      if( row.TechnicianID === techID )
      {
        expertiseTags.push(row.TagType);
      }
    });

    let matchingTagChips = []

    expertiseTags.forEach((tag) => { 
      if(ticketTags.includes(tag)) 
      {
        const tagFromtbl = tblTags.find((record) => record.Type === tag);

        if (tagFromtbl.Category === "Operating System") {
          matchingTagChips.push(
            <Chip
              label={tag}
              key={tag}
              style={{ backgroundColor: "#3399ff", color: "#ffffff" }}
            />
          );
        } else if (tagFromtbl.Category === "Hardware") {
          matchingTagChips.push(
            <Chip
              label={tag}
              key={tag}
              style={{ backgroundColor: "#cc0000", color: "#ffffff" }}
            />
          );
        } else if (tagFromtbl.Category === "Software") {
          matchingTagChips.push(
            <Chip
              label={tag}
              key={tag}
              style={{ backgroundColor: "#0000ff", color: "#ffffff" }}
            />
          );
        }
      }
    })

    if (matchingTagChips.length === 0)
    {
      matchingTagChips = <Chip label="No Matching Tags" key="none" />
    }

    return matchingTagChips;
  }

  const techNumOfOpenTickets = (techID) => {
    
    const record = techsTicketCount.find((record) => record.TechnicianID === techID);

    if (record)
    {
      return record.NumOfTickets;
    }
    else
    {
      return 0;
    }
  }

  //if (!loading) {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      fullWidth={true}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Assign Ticket
        <IconButton
          aria-label="close"
          className={styles.closeButton}
          onClick={handleCancel}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.AssignToTechnicianDialog}>
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
            >
              <Typography>Assign the Ticket to a Technician</Typography>
            </Grid>
          </Grow>

          <Grow in={true} timeout={600}>
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
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Autocomplete
                  options={techs}
                  getOptionLabel={(option) => option.FirstName + " " + option.LastName}
                  renderOption={(option) => (
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="flex-start"
                      onClick={() => setSelectedTechID(option.ID)}
                    >
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <span>{option.FirstName+" "+option.LastName}</span>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
                        <span>Open Tickets: {techNumOfOpenTickets(option.ID)}</span>
                      </Grid>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <span style={{paddingRight: "5px"}}>Matching Tags: {techNumOfMatchingTags(option.ID)}</span>
                        <span className={styles.chipField}>{techMatchingTagChips(option.ID)}</span>
                      </Grid>
                    </Grid>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Technicians"
                      variant="outlined"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grow>

          <Grid container item justifyContent="flex-end" spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={styles.assignBtn}
                onClick={handleAssignTechnician}
              >
                Assign
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
  //         <DialogContent className={styles.AssignToTechnicianDialog}>
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

export default AssignToTechnician;
