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
  Select,
  MenuItem,
  Chip,
  ListItemText,
  Button,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import { useSelector, useDispatch } from "react-redux";

import { useSnackbar } from "notistack";

import { makeStyles } from "@material-ui/core/styles";
import { SwatchesPicker } from "react-color";
import { postTagCategoryAction } from "../../redux/user/userActions";

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
  AddTagCategoryDialog: {
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

const AddTagCategory = ({ open, handleOpen, handleClose }) => {
  // create dispatch
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();

  const styles = useStyles();

  const [category, setCategory] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("");
  const [color, setColor] = useState("#000000");

  const tagCategories = useSelector((state) => state.User.tagCategories);

  const organizationID = useSelector(
    (state) => state.User.user.tblOrganization.ID
  );

  const handleAddTagCategory = () => {
    
    if (category !== "" && backgroundColor != "")
    {
      let existingCategories = tagCategories.map((row) => row.Category);
      
      if (existingCategories.includes(category))
      {
        enqueueSnackbar("Tag Category Name already exists", {
          variant: "error",
        });
      }
      else
      {
        dispatch(
            postTagCategoryAction(
                category,
                backgroundColor,
                color,
                organizationID,
            )
        );

        enqueueSnackbar("Tag Category added successfully", {
          variant: "success",
        });
      }
    }
    else
    {
      enqueueSnackbar("Please supply a Category Name and Chip Color", {
        variant: "error",
      });
    }

    handleCancel();
  };

  const handleCancel = () => {
    setCategory("");
    setBackgroundColor(""); 
    setColor("#000000");
    
    handleClose();
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  }

  const handleBackgroundColor = (e) => {
    setBackgroundColor(e.hex);      
  }

  const handleColor = (e) => {
    setColor(e.target.value);      
  }

  //if (!loading) {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      //fullWidth={true}
      
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Add Tag Category
        <IconButton
          aria-label="close"
          className={styles.closeButton}
          onClick={handleCancel}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.AddTagCategoryDialog}>
        <Grid container spacing={2} className={styles.userInfoGridRoot}>

          <Grow in={true} timeout={300}>
            <Grid
                container
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
            >
                <Grid
                container
                item
                direction="column"
                justifyContent="center"
                alignItems="center"
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                spacing={2}
                >
                    <Grid item>
                        <TextField
                            label="Category Name"
                            variant="outlined"
                            value={category}
                            onChange={handleCategory}
                            className={styles.inputField}
                        />
                    </Grid>
                    <Grid container item>
                        <Typography style={{paddingBottom: "5px"}}>
                            Chip Color:
                        </Typography>
                        <SwatchesPicker
                            value={backgroundColor}
                            onChange={handleBackgroundColor}
                            width="100%"
                        />
                    </Grid>
                    <Grid container item alignItems="center" >
                        <Typography style={{padding: "5px"}} >
                            Text Color:
                        </Typography>
                        <Select
                            value={color}
                            onChange={handleColor}
                            
                        >
                            <MenuItem key={"White"} value={"#ffffff"}>
                                <ListItemText primary={"White"} />
                            </MenuItem>
                            <MenuItem key={"Black"} value={"#000000"}>
                                <ListItemText primary={"Black"} />
                            </MenuItem>
                        </Select>
                    </Grid>                
                </Grid>
                <Grid
                container
                item
                xs={6}
                sm={6}
                md={6}
                lg={6}
                xl={6}
                justifyContent="center"
                alignItems="center"
                >
                    <Chip
                    label={`Sample ${category} Tag`}
                    key={"PreviewChip"}
                    style={{ backgroundColor: backgroundColor, color: color }}
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
                onClick={handleAddTagCategory}
              >
                Add Category
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
  //         <DialogContent className={styles.AddTagCategoryDialog}>
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

export default AddTagCategory;
