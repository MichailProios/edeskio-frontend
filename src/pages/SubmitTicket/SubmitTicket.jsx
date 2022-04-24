import React, { useState, useEffect } from "react";

// Redux Imports
import { useSelector, useDispatch } from "react-redux";

//Material-UI Styles
import { makeStyles } from "@material-ui/styles";

//Material-UI Components
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Fade,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  Backdrop,
  IconButton,
  Chip,
  Checkbox,
  ListItemText,
  Grow,
} from "@material-ui/core";

import moment from "momnet";

import Autocomplete from "@material-ui/lab/Autocomplete";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import CreateIcon from "@material-ui/icons/Create";
import { Category, Satellite } from "@material-ui/icons";

import PageHeader from "../../components/PageHeader/PageHeader";
import { postTicketNewTicketAction } from "../../redux/user/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5em",
  },
  cardRoot: {
    width: "40em",
    margin: "auto",
  },

  mainGrid: {
    justifyContent: "center",
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

  submitBtn: {
    width: "100%",
    backgroundColor: theme.palette.primary.main,
    color: "#f3f3f3",
    // "&:hover": {
    //   backgroundColor: theme.palette.button.hover,
    // },
  },

  outGrid: {
    justifyContent: "center",
    alignItems: "center",
  },

  submitButton: {
    width: "100%",
  },
}));

//

const SubmitTicket = () => {
  // create dispatch
  const dispatch = useDispatch();

  const tblTags = useSelector((state) => state.User.tags);

  // local state
  const styles = useStyles();

  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");

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
  }, [tblTags]);

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

      newChips.push(
        <Chip
          label={tag}
          key={tag}
          style={{ backgroundColor: tagFromtbl.BackgroundColor, color: tagFromtbl.Color}}
        />
      );
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

  const handleTicketSubject = (e) => {
    setTicketSubject(e.target.value);
  };

  const handleTicketDescription = (e) => {
    setTicketDescription(e.target.value);
  };

  const userID = useSelector((state) => state.User.user.tblUser.ID);

  const handleSubmit = () => {
    if (ticketSubject.length > 0 && ticketDescription.length > 0) {
      dispatch(
        postTicketNewTicketAction(
          userID,
          ticketSubject,
          ticketDescription,
          moment().format("YYYY-MM-DD HH:mm:ss"),
          selectedTags
        )
      );
    }

    setTicketSubject("");
    setTicketDescription("");
    setSelectedTags([]);
    setSelectedTagsChips([]);
  };

  return (
    <div className={styles.root}>
      <PageHeader title={"New Ticket"} />
      <Grow in={true} timeout={150}>
        <Card className={styles.cardRoot} raised={true}>
          <Grid container className={styles.outGrid}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <CardHeader title="Submit Ticket" />
            </Grid>
          </Grid>
          {/* <CardHeader title="" className={styles.cardHeader} /> */}
          <Divider />
          <CardContent className={styles.contentArea}>
            <Grid container className={styles.mainGrid} spacing={2}>
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
                <TextField
                  label="Ticket Subject"
                  variant="outlined"
                  value={ticketSubject}
                  onChange={handleTicketSubject}
                  required={true}
                  className={styles.inputField}
                />
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
                <TextField
                  label="Ticket Description"
                  variant="outlined"
                  value={ticketDescription}
                  onChange={handleTicketDescription}
                  required={false}
                  className={styles.inputField}
                  multiline
                  minRows={4}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <InputLabel>Ticket Tags</InputLabel>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <div id="tags-text" className={styles.chipField}>
                  {selectedTagsChips.length === 0 ? (
                    <Chip label="None Selected" key="none" />
                  ) : (
                    selectedTagsChips
                  )}
                </div>
              </Grid>
              <Grid
                container
                item
                justifyContent="center"
                xs={4}
                sm={4}
                md={4}
                lg={4}
                xl={4}
              >
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
              <Grid
                container
                item
                justifyContent="center"
                xs={8}
                sm={8}
                md={8}
                lg={8}
                xl={8}
              >
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
          </CardContent>
          <CardActions className={styles.cardActionAreaButton}>
            <Button
              variant="contained"
              color="primary"
              className={styles.submitButton}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </Grow>
    </div>
  );
};

export default SubmitTicket;
