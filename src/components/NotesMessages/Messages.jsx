import React, { useState, useRef, useEffect } from "react";
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

import io from "socket.io-client";

import CloseIcon from "@material-ui/icons/Close";
import { AiOutlineSend } from "react-icons/ai";

import { withStyles } from "@material-ui/styles";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  messagesAction,
  postMessageAction,
} from "../../redux/user/userActions";
import {
  DeleteForever,
  Edit,
  MoreHoriz,
  RestorePage,
} from "@material-ui/icons";

import { endpoints } from "../../redux/user/userEndpoints";

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

  noteText: { userSelect: "none", fontSize: "0.8em" },

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

  textField: {
    width: "100%",
    userSelect: "none",
    userDrag: "none",
  },

  outGrid: {
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Notes = ({ ticketID }) => {
  // create dispatch
  const dispatch = useDispatch();

  const styles = useStyles();

  const [currentMessage, setCurrentMessage] = useState("");

  const messages = useSelector((state) => state.User.privateMessages);
  const userID = useSelector((state) => state.User.user.tblUser.ID);

  const socketRef = useRef();

  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socketRef.current = io.connect(endpoints.messagesWS, {
      query: { test: 2 },
    });

    socketRef.current.on("connect", () => {
      setConnected(socketRef.current.connected);
    });

    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    if (connected) {
      socketRef.current.on("messagesNew", ({ messages }) => {
        dispatch(messagesAction(messages));
      });

      socketRef.current.emit("messagesOpen", { ticketID });
    }
  }, [dispatch, connected, ticketID]);

  const handleMessageChange = (e) => {
    setCurrentMessage(e.target.value);
  };

  const handleMessageSend = () => {
    const date = moment().format("YYYY-MM-DD HH:mm:ss");
    const privateMsg = false;

    if (currentMessage !== "" && currentMessage.length <= 255) {
      setCurrentMessage("");
      socketRef.current.emit("messageSent", {
        userID,
        ticketID,
        currentMessage,
        date,
        privateMsg,
      });
    }
  };

  const StyledChip = withStyles({
    root: {
      // backgroundColor: "red", // here you can do anything actually
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    label: {
      fontSize: "1.2em",
    },
  })(Chip);

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
            <div
              style={{
                width: "100%",
                height: "250px",
                overflowY: "scroll",
                top: 1000,
              }}
            >
              {messages.length === 0 ? (
                <Grid container item key="noNotes" justifyContent="center">
                  <Typography style={{ userSelect: "none" }}>
                    No Messages
                  </Typography>
                </Grid>
              ) : (
                messages.map((message) => {
                  if (message.SentBy === userID) {
                    return (
                      <div key={message.ID}>
                        <Grid container item justifyContent="flex-end">
                          {/* <Typography className={styles.messageField}>
                        {message.Content}
                      </Typography> */}

                          <StyledChip label={message.Content} color="primary" />
                        </Grid>
                        <Grid container item justifyContent="flex-end">
                          {/* <Typography className={styles.messageField}>
                        {message.Content}
                      </Typography> */}

                          <Typography
                            className={styles.noteText}
                            color="textSecondary"
                          >
                            {message.tblUser.FirstName +
                              " " +
                              message.tblUser.LastName +
                              " " +
                              moment(message.DateSent).utc().format("lll")}
                          </Typography>
                        </Grid>
                      </div>
                    );
                  } else {
                    return (
                      <div key={message.ID}>
                        <Grid container item justifyContent="flex-start">
                          {/* <Typography className={styles.messageField}>
                        {message.Content}
                      </Typography> */}

                          <StyledChip label={message.Content} color="primary" />
                        </Grid>
                        <Grid container item justifyContent="flex-start">
                          {/* <Typography className={styles.messageField}>
                        {message.Content}
                      </Typography> */}

                          <Typography
                            className={styles.noteText}
                            color="textSecondary"
                          >
                            {message.tblUser.FirstName +
                              " " +
                              message.tblUser.LastName +
                              " " +
                              moment(message.DateSent).utc().format("lll")}
                          </Typography>
                        </Grid>
                      </div>
                    );
                  }
                })
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TextField
              variant="outlined"
              value={currentMessage}
              onChange={handleMessageChange}
              className={styles.textField}
              multiline
              maxRows={5}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      color="primary"
                      onClick={handleMessageSend}
                    >
                      <AiOutlineSend />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13 && !e.shiftKey) {
                  e.preventDefault();
                  handleMessageSend();
                }
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Notes;
