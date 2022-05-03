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
  InputAdornment,
  Menu,
  ListItemIcon,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import { AiOutlineSend } from "react-icons/ai";

import moment from "momnet";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import { getMessagesOneAction, postMessageAction } from "../../redux/user/userActions";
import { DeleteForever, Edit, MoreHoriz, RestorePage } from "@material-ui/icons";

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
  noteGrid: {
    padding: "10px 0",
  },
  noteField: {
    flexShrink: "revert",
    color: theme.palette.primary.main,
    borderRadius: "25px",
    border: `1px solid ${theme.palette.primary.main}`,
    padding: "5px",
    margin: "2px",
  },
  queryButton: {
    backgroundColor: theme.palette.primary.main,
    color: "#f3f3f3",
    width: "100%",

    // "&:hover": {
    //   backgroundColor: theme.palette.button.hover,
    // },
  },
  mainGrid: {
    justifyContent: "center",
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

  textField: {
    width: "100%",
    userSelect: "none",
    userDrag: "none",
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

const Notes = ({
  ticketID,
}) => {
  // create dispatch
  const dispatch = useDispatch();

  const styles = useStyles();

  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");

  const [noteIDHovered, setNoteIDHovered] = useState("");

  const [noteOptionsOpen, setNoteOptionsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const allMessages = useSelector((state) => state.User.messages);
  const userID = useSelector((state) => state.User.user.tblUser.ID);

  useEffect(() => {
    setNotes(allMessages.filter((message) => { if (message.Private === true) return message; } ));
  }, [allMessages]);

  const handleNoteChange = (e) => {
    setCurrentNote(e.target.value)
  }

  const handleNotesOptionsEnter = (e, noteID) => {
    setNoteOptionsOpen(true);
    setAnchorEl(e.target);
    setNoteIDHovered(noteID);
  }

  const handleNotesOptionsLeave = () => {
    setNoteOptionsOpen(false);
    setAnchorEl(null);
    setNoteIDHovered("");
  }

  const handleEditNoteClick = () => {
    console.log("Edit ", noteIDHovered)
  }

  const handleDeleteNote = () => {
    console.log("Delete ", noteIDHovered)
  }

  const handleNewNote = (e) => {

      if (currentNote !== "" && currentNote.length <= 255)
      {
          dispatch(
            postMessageAction(
                userID,
                ticketID,
                currentNote,
                moment().format("YYYY-MM-DD HH:mm:ss"),
                true,
            )
          );

          setCurrentNote("");
      }
  }

  //if (!loading) {
  return (
    <React.Fragment>
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
              <Grid container item spacing={1} className={styles.noteGrid}>
              <div style={{width: "100%", height: "250px", overflowY: "scroll"}}>
                  {notes.length === 0 ? (
                      <Grid 
                          container 
                          item
                          key="noNotes"
                          justifyContent="center"
                      >
                          <Typography>
                              No Notes
                          </Typography>
                      </Grid>
                      ) : (
                      notes.map((note) => {
                          return (
                              <Grid 
                                  container 
                                  item 
                                  key={note.ID} 
                                  justifyContent="flex-end"
                              >
                                  <Typography 
                                    className={styles.noteField} 
                                    onMouseEnter={(e) => handleNotesOptionsEnter(e, note.ID)}
                                    //onMouseLeave={() => handleNotesOptionsLeave()}
                                  >
                                      {note.Content}
                                  </Typography>                                
                              </Grid>
                          );
                      })
                  )}
              </div>
              </Grid>
              <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  xl={12}
              >
                  <TextField
                      variant="outlined"
                      value={currentNote}
                      onChange={handleNoteChange}
                      className={styles.textField}
                      multiline
                      maxRows={5}
                      InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton edge="end" color="primary" onClick={handleNewNote}>
                                <AiOutlineSend />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      onKeyDown={(e) => {if (e.keyCode === 13 && !e.shiftKey) {e.preventDefault(); handleNewNote();}}}
                  />
              </Grid>
          </Grid>
      </Grid>

      {noteOptionsOpen && (
        <Menu 
          anchorEl={anchorEl}
          id="note-options"
          keepMounted
          open={Boolean(noteOptionsOpen)}
          onClose={handleNotesOptionsLeave}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'left',
          }}
          
        >
        <MenuItem onClick={handleEditNoteClick}>
          <ListItemIcon>
            <Edit color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" color="textPrimary">
                Edit
              </Typography>
            }
          />
        </MenuItem>
        <MenuItem onClick={handleDeleteNote}>
          <ListItemIcon>
            <DeleteForever color="primary" />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body1" color="textPrimary">
                Delete
              </Typography>
            }
          />
        </MenuItem>
      </Menu>
      )}
    </React.Fragment>
  );
};

export default Notes;
