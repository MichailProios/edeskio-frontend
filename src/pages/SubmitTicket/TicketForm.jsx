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
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import CreateIcon from "@material-ui/icons/Create";
import { Category } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
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
}));

const tblTags = [
  {
    Type: "Windows 8",
    Category: "Operating System",
    Description: "",
  },
  {
    Type: "Windows 8.1",
    Category: "Operating System",
    Description: "",
  },
  {
    Type: "Windows 10",
    Category: "Operating System",
    Description: "",
  },
  {
    Type: "Windows 11",
    Category: "Operating System",
    Description: "",
  },
  {
    Type: "Laptop",
    Category: "Hardware",
    Description: "",
  },
  {
    Type: "Desktop",
    Category: "Hardware",
    Description: "",
  },
  {
    Type: "Server",
    Category: "Hardware",
    Description: "",
  },
  {
    Type: "Website",
    Category: "Software",
    Description: "",
  },
  {
    Type: "Intranet",
    Category: "Software",
    Description: "",
  },
];

const TicketForm = () => {
  // create dispatch
  const dispatch = useDispatch();

  // local state
  const styles = useStyles();

  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketTags, setTicketTags] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryTags, setSelectedCategoryTags] = useState( [... new Set(tblTags.map(tag => tag))] );
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
      
  }, [])


  let uniqTagCategories = ["All"];
  uniqTagCategories = uniqTagCategories.concat( [... new Set(tblTags.map(tag => tag.Category))] );

  console.log("uniq",uniqTagCategories);
  console.log("tags",selectedCategoryTags);
  console.log("selected",selectedTags);



  const handleCagetoryChange = (e) => {

    let newCategory = e.target.value;
    console.log("new", newCategory);

    setSelectedCategory(newCategory);

    let newTags = [];

    newTags = tblTags.map((tag) => {
        if (tag.Category === newCategory || newCategory === "All")
        {
            console.log("new2", tag.Category)
            return tag;
        }
    })

    setSelectedCategoryTags(newTags);
  }

  const handleTagsChange = (e) => {
    
    const indexOfNewestTag = e.target.value.length - 1;
    const tagFromtbl = tblTags.find(
      (record) => record.Type === e.target.value[indexOfNewestTag],
    );

    setSelectedTags(e.target.value);
  }

//   const handleStateChange = (e) => {
//     // find the state inside of tblStateCodes. The e.target.value is an array filled with the users selections.
//     const indexOfNewestState = e.target.value.length - 1;
//     const stateFromTblStateCodes = tblStateCodes.find(
//       (record) => record.StateName === e.target.value[indexOfNewestState],
//     );

//     // set the cost in local state
//     setCost((prevState) => {
//       // If one State is checked
//       if (stateCodes.length < e.target.value.length) {
//         return prevState + parseInt(stateFromTblStateCodes.Cost);
//       }
//       // If one State is unchecked
//       else if (stateCodes.length > e.target.value.length) {
//         let uncheckedState = "";

//         // Find State missin from e.target.value array, then find State in tblStateCodes and assign to uncheckedState var
//         stateCodes.forEach((stateCode) => {
//           if (!e.target.value.includes(stateCode)) {
//             uncheckedState = tblStateCodes.find(
//               (record) => record.StateName === stateCode,
//             );
//           }
//         });

//         return prevState - parseInt(uncheckedState.Cost);
//       }
//     });

//     // need to update stateText here
//     setStateText((prevValue) => {
//       // If e.target.value array is 0, return empty array []
//       return e.target.value.length > 0
//         ? [...prevValue, stateFromTblStateCodes.StateName]
//         : [];
//     });

//     // update the stateCode local state so it is checked on selection (also updates state text box)
//     setStateCodes(e.target.value);
//   };

  const handleReset = () => {
    // local state
    setTicketSubject("");
    setTicketDescription("");
    setTicketTags([]);
  };

  const handleSubmit = (e) => {
    // setShowToast(true);
    // const testEmployeeNameForSubmit =
    //   testEmployeeName.length <= 0 ? empName : testEmployeeName;
    // const testEmployeeEmailForSubmit =
    //   testEmployeeName.length <= 0 ? empEmail : testEmployeeEmail;

    // let input;
    // input =
    //   registrationType === "State Registration"
    //     ? {
    //         registrationType,
    //         stateSupervisor,
    //         stateSupervisorEmail,
    //         branch,
    //         repCode,
    //         stateCodes,
    //         cost,
    //         stateEmployeeName,
    //         stateText,
    //         userSubmitting: empEmail,
    //         employeeForEmail: autocompleteEmailState,
    //         requesterName: empName,
    //         //don't forget to push changes!!!! talk to you tomorrow
    //         // yes thank you much love xoxo
    //       }
    //     : {
    //         registrationType,
    //         registerName, // applicant name
    //         employeeForEmail: autocompleteEmailTest, // applicant email
    //         testSupervisor, // supervisor name
    //         stateSupervisorEmail: testSupervisorEmail, // supervisor email, need to name it state here since we do a query on the back end and name needs to be consistent for both
    //         userSubmitting: testEmployeeEmailForSubmit, // requester email
    //         employeeName: testEmployeeNameForSubmit, // requester name
    //         testName, // test name
    //         testFee, // test fee
    //         studyCost, // study cost
    //         totalCost, // total cost
    //         notes, // notes (if any)
    //       };
    // );

    // dispatch(postRegistrationEmailAction(input));

    // handleReset();
  };

    return (
      <>
        <Card className={styles.root}>
          <Grid container className={styles.outGrid}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <CardHeader
                title="Submit Ticket"
              />
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
                required={false}
                className={styles.inputField}
                multiline
                rows={4}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TextField
                  id="tags-text"
                  className={styles.inputField}
                  label="Ticket Tags"
                  multiline
                  rows={2}
                  variant="outlined"
                //   value={
                //     stateCodes.length > 1 ? stateCodes.join(", ") : stateCodes
                //   }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreateIcon />
                      </InputAdornment>
                    ),
                  }}
                />
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
                    <TextField
                        select
                        defaultValue={"All"}
                        variant="outlined"
                        // error={stateCodesError}
                        onChange={handleCagetoryChange}
                        //renderValue={(selected) => selected.join(", ")}
                        className={styles.inputField}
                        label="Tag Group"
                    >
                    {uniqTagCategories.map((category,index) => 
                        {
                            return (
                              <MenuItem key={index} value={category}>
                                  {category}
                              </MenuItem>  
                            );
                        }
                    )}
                    </TextField>
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
                    //error={stateCodesError}
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
            
            >
              Submit
            </Button>
          </CardActions>
        </Card>
      </>
    );
};

export default TicketForm;
