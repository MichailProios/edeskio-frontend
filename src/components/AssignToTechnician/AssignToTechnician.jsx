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
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

import Skeleton from "@material-ui/lab/Skeleton";

import CloseIcon from "@material-ui/icons/Close";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

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

  outGrid: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

const AssignToTechnician = ({ open, handleOpen, handleClose, setSelected }) => {
  // create dispatch
  const dispatch = useDispatch();

  const styles = useStyles();

  const handleassign = () => {
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  const users = useSelector((state) => state.User.users.tblUsers);

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
              <Typography>Assign ticket to a Technician</Typography>
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
                  options={users}
                  getOptionLabel={(option) => option.Email}
                  onChange={(event) => setSelected(event.target.textContent)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Technicians"
                      // value={selected}
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
                onClick={handleassign}
              >
                assign
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
