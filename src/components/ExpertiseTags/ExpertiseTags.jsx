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

import Skeleton from "@material-ui/lab/Skeleton";

import CloseIcon from "@material-ui/icons/Close";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import {
  getExpertiseTagsOneAction,
  postExpertiseTagsAction,
} from "../../redux/user/userActions";

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
  expertiseTagsDialog: {
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

  saveBtn: {
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

const ExpertiseTags = ({ open, handleOpen, handleClose }) => {
  // create dispatch
  const dispatch = useDispatch();

  //const loading = useSelector((state) => state.User.loading);
  const user = useSelector((state) => state.User.user);
  const userID = useSelector((state) => state.User.user.tblUser.ID);

  const styles = useStyles();

  const tblTags = useSelector((state) => state.User.tags.tblTags);

  const [uniqTagCategories, setUniqTagCategories] = useState([
    "All",
    ...new Set(tblTags.map((tag) => tag.Category)),
  ]);

  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [selectedCategoryTags, setSelectedCategoryTags] = useState([
    ...new Set(tblTags.map((tag) => tag)),
  ]);
  const [selectedTagsChips, setSelectedTagsChips] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    setUniqTagCategories([
      "All",
      ...new Set(tblTags.map((tag) => tag.Category)),
    ]);

    setSelectedCategoryTags([...new Set(tblTags.map((tag) => tag))]);

    if (userID !== "") {
      //setSelectedTags( dispatch(getExpertiseTagsOneAction(userID)) );
    }
  }, [dispatch, tblTags]);

  const handleCagetoryChange = (e) => {
    let newCategories = [];

    if (e.target.value.length > selectedCategories.length) {
      let newestCategory = e.target.value[e.target.value.length - 1];

      if (newestCategory === "All") {
        newCategories = ["All"];
      } else {
        e.target.value.forEach((category) => {
          if (category !== "All") {
            newCategories.push(category);
          }
        });
      }
    } else {
      newCategories = e.target.value;
    }

    setSelectedCategories(newCategories);

    let newTags = [];

    tblTags.forEach((tag) => {
      if (
        newCategories.includes(tag.Category) ||
        newCategories.includes("All")
      ) {
        newTags.push(tag);
      }
    });

    setSelectedCategoryTags(newTags);
  };

  const handleTagsChange = (e) => {
    let newChips = [];

    e.target.value.forEach((tag) => {
      const tagFromtbl = tblTags.find((record) => record.Type === tag);

      if (tagFromtbl.Category === "Operating System") {
        newChips.push(
          <Chip
            label={tag}
            key={tag}
            style={{ backgroundColor: "#3399ff", color: "#ffffff" }}
            onDelete={handleTagChipDelete.bind(this, tag)}
          />
        );
      } else if (tagFromtbl.Category === "Hardware") {
        newChips.push(
          <Chip
            label={tag}
            key={tag}
            style={{ backgroundColor: "#cc0000", color: "#ffffff" }}
            onDelete={handleTagChipDelete.bind(this, tag)}
          />
        );
      } else if (tagFromtbl.Category === "Software") {
        newChips.push(
          <Chip
            label={tag}
            key={tag}
            style={{ backgroundColor: "#0000ff", color: "#ffffff" }}
            onDelete={handleTagChipDelete.bind(this, tag)}
          />
        );
      }
    });

    setSelectedTagsChips(newChips);
    setSelectedTags(e.target.value);
  };

  const handleTagChipDelete = (deletedTag, e) => {
    setSelectedTagsChips((chips) =>
      chips.filter((chip) => chip.key !== deletedTag)
    );
    setSelectedTags((tags) => tags.filter((tag) => tag !== deletedTag));
  };

  const handleSave = () => {
    dispatch(postExpertiseTagsAction(userID, selectedTags));

    handleClose();
  };

  const handleCancel = () => {
    setSelectedCategories(["All"]);
    setSelectedCategoryTags([...new Set(tblTags.map((tag) => tag))]);
    setSelectedTags([]);
    setSelectedTagsChips([]);

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
        Expertise Tags
        <IconButton
          aria-label="close"
          className={styles.closeButton}
          onClick={handleCancel}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={styles.expertiseTagsDialog}>
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
              <Typography>Select All Tags that match your Expertise</Typography>
            </Grid>
          </Grow>
          <Grow in={true} timeout={300}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <div id="tags-text" className={styles.chipField}>
                {selectedTagsChips.length === 0 ? (
                  <Chip label="None Selected" key="none" />
                ) : (
                  selectedTagsChips
                )}
              </div>
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
              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <FormControl variant="outlined" className={styles.formControl}>
                  <InputLabel>Tag Category</InputLabel>
                  <Select
                    multiple
                    value={selectedCategories}
                    //error={}
                    onChange={handleCagetoryChange}
                    renderValue={(selected) => selected.join(", ")}
                    className={styles.inputField}
                    label="Tag Category"
                    defaultValue={"All"}
                  >
                    {uniqTagCategories.map((Category) => (
                      <MenuItem key={Category} value={Category}>
                        <Checkbox
                          checked={selectedCategories.indexOf(Category) > -1}
                        />
                        <ListItemText primary={Category} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={8} xl={8}>
                <FormControl variant="outlined" className={styles.formControl}>
                  <InputLabel>Tag Types</InputLabel>
                  <Select
                    multiple
                    value={selectedTags}
                    //error={}
                    onChange={handleTagsChange}
                    renderValue={(selected) => selected.join(", ")}
                    className={styles.inputField}
                    label="Tag Types"
                    defaultValue={""}
                  >
                    {selectedCategoryTags.map((tag) => (
                      <MenuItem key={tag.Type} value={tag.Type}>
                        <Checkbox
                          checked={selectedTags.indexOf(tag.Type) > -1}
                        />
                        <ListItemText primary={tag.Type} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grow>
          <Grow in={true} timeout={600}>
            <Grid container item justifyContent="flex-end" spacing={2}>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  className={styles.saveBtn}
                  onClick={handleSave}
                >
                  Save
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
          </Grow>
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
  //         <DialogContent className={styles.expertiseTagsDialog}>
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

export default ExpertiseTags;
