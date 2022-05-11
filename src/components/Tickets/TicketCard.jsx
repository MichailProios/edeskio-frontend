import React, { useState, useEffect } from "react";

//Material-UI Styles
import { makeStyles, useTheme } from "@material-ui/styles";

import {
  Slide,
  Paper,
  Grid,
  TextField,
  Card,
  CardContent,
  Typography,
  CardHeader,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';

import { useSelector, useDispatch } from "react-redux";
import {
  deleteTicketAction,
  getMessagesOneAction,
  getTechniciansAssignAction,
  getUserOrganizationAction,
  putTicketCloseAction,
  putTicketPriorityAction,
  putTicketsAssignAction,
} from "../../redux/user/userActions";
import {
  DeleteForever,
  HighlightOff,
  MoreVert,
  TrendingUp,
} from "@material-ui/icons";

import moment from "momnet";

import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AssignToTechnician from "../AssignToTechnician/AssignToTechnician";
import AutoAssignToTechnician from "../AutoAssignToTechnician/AutoAssignToTechnician";
import NotesMessages from "../NotesMessages/NotesMessages";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%",
    position: "relative",
  },

  cardContent: {
    width: "100%",
    height: "20em",
  },

  subject: {
    fontSize: "14pt",
  },
  ticketID: {
    fontSize: "12pt",
  },
  description: {
    fontSize: "12pt",
  },
  bottomDivider: {
    position: "absolute",
    bottom: theme.spacing(9),
    left: theme.spacing(0),
    width: "100%",
  },

  chipField: {
    position: "absolute",
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    width: "100%",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },

  info: {
    fontSize: "12pt",
  },
  assignedChip: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
  },
}));

const TicketCard = ({ ticket }) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const getTagType = (array) => {
    let tags = array.map(({ ID, TechnicianID, ...tag }) => tag);

    tags = Object.values(tags).map((element) => element.TagType);

    return tags;
  };

  const getTagChips = (tags) => {
    let newChips = [];

    // ticket.tags.forEach({
    tags.forEach((tag) => {
      const tagFromtbl = tblTags.find((record) => record.Type === tag);

      if (tagFromtbl)
      {
        newChips.push(
          <Chip
            label={tag}
            key={tag}
            style={{
              backgroundColor: tagFromtbl.BackgroundColor,
              color: tagFromtbl.Color,
            }}
          />
        );
      }

    });

    setSelectedTagsChips(newChips);
  };

  const tblTags = useSelector((state) => state.User.tags);

  const ticketTagsTbl = useSelector((state) => state.User.ticketTags);

  const [ticketTags, setTicketTags] = useState(
    ticketTagsTbl.filter((element) => element.TicketID === ticket.ID)
  );

  useEffect(() => {
    setTicketTags(
      ticketTagsTbl.filter((element) => element.TicketID === ticket.ID)
    );
  }, [ticket.ID]);

  const [selectedTagsChips, setSelectedTagsChips] = useState([]);
  const [selectedTags, setSelectedTags] = useState(getTagType(ticketTags));

  useEffect(() => {
    setSelectedTags(getTagType(ticketTags));
  }, [ticketTags]);

  const handleTicketOptionsClick = (e) => {
    setOptionsOpen(true);
    setAnchorEl(e.target);
  };

  const handleTicketOptionsClose = (e) => {
    setOptionsOpen(false);
    setAnchorEl(null);
  };

  const userID = useSelector((state) => state.User.user.tblUser.ID);
  const userRole = useSelector((state) => state.User.user.tblAccess.RoleName);

  const techs = useSelector((state) => state.User.techs);

  const handleAssignToSelf = () => {
    dispatch(
      putTicketsAssignAction(
        ticket.ID,
        userID,
        moment().format("YYYY-MM-DD HH:mm:ss")
      )
    );

    setOptionsOpen(false);
    setAnchorEl(null);
  };

  const handleUnassign = () => {
    dispatch(
      putTicketsAssignAction(
        ticket.ID,
        null,
        moment().format("YYYY-MM-DD HH:mm:ss")
      )
    );

    setOptionsOpen(false);
    setAnchorEl(null);
  };

  useEffect(() => {
    getTagChips(selectedTags);
  }, [selectedTags]);

  const [openAssign, setOpenAssign] = useState(false);
  const [openAutoAssign, setOpenAutoAssign] = useState(false);
  const [openNotesMessages, setOpenNotesMessages] = useState(false);
  const user = useSelector((state) => state.User.user.tblUser.ID);

  const handleAssignOpen = () => {
    dispatch(getTechniciansAssignAction(user));

    setOpenAssign(true);
    setOptionsOpen(false);
    setAnchorEl(null);
  };

  const handleAssignClose = () => {
    setOpenAssign(false);
  };

  const handleAutoAssignOpen = () => {
    dispatch(getTechniciansAssignAction(user));

    setOpenAutoAssign(true);
    setOptionsOpen(false);
    setAnchorEl(null);
  };

  const handleAutoAssignClose = () => {
    setOpenAutoAssign(false);
  };

  const handleNotesMessagesOpen = () => {
    dispatch(getMessagesOneAction(ticket.ID));

    setOpenNotesMessages(true);
    setOptionsOpen(false);
    setAnchorEl(null);
  };

  const handleNotesMessagesClose = () => {
    setOpenNotesMessages(false);
  };

  const handleRaisePriority = () => {
    setOptionsOpen(false);
    setAnchorEl(null);

    let priority = "";

    if (ticket.Priority === "Medium") {
      priority = "High";
    } else if (ticket.Priority === "Low") {
      priority = "Medium";
    } else {
      return;
    }

    dispatch(putTicketPriorityAction(ticket.ID, priority));
  };

  const handleLowerPriority = () => {
    setOptionsOpen(false);
    setAnchorEl(null);

    let priority = "";

    if (ticket.Priority === "Medium") {
      priority = "Low";
    } else if (ticket.Priority === "High") {
      priority = "Medium";
    } else {
      return;
    }

    dispatch(putTicketPriorityAction(ticket.ID, priority));
  };

  const handleCloseTicket = () => {
    setOptionsOpen(false);
    setAnchorEl(null);

    dispatch(putTicketCloseAction(ticket.ID));
  }

  const handleDeleteTicket = () => {
    setOptionsOpen(false);
    setAnchorEl(null);

    dispatch(deleteTicketAction(ticket.ID));
  }

  const [selected, setSelected] = useState("");

  const getTechnicianName = () => {
    const tech = techs.find((record) => record.ID === ticket.TechnicianID);

    if (tech) {
      return tech.FirstName + " " + tech.LastName;
    } else {
      return "Unassigned";
    }
  };

  const [fullName, setFullName] = useState("");

  const users = useSelector((state) => state.User.users.tblUsers);

  useEffect(() => {

    if (users.length > 0)
    {
      const submittedUser = users.find((record) => record.ID === ticket.UserID);
      setFullName(submittedUser.FirstName + " " + submittedUser.LastName)
    }

  }, [ticket, users]);

  return (
    <>
      <Card elevation={10} className={styles.card} >
        <CardHeader
          title={ticket.Subject}
          subheader={`Ticket ID: ${ticket.ID}`}
          action={
            userRole !== "Basic" && (
              <IconButton onClick={handleTicketOptionsClick}>
                <MoreVert />
              </IconButton>
            )
          }
        />
        <Divider />
        <CardContent className={styles.cardContent}>
          <Grid container style={{ height: "100%" }}>
            <Grid
              item
              xs={10}
              sm={10}
              md={10}
              lg={10}
              xl={10}
              onClick={handleNotesMessagesOpen}
            >
              <Grid
                container
                item
                xs={9}
                sm={9}
                md={9}
                lg={9}
                xl={9}
                justifyContent="flex-start"
              >
                <Typography className={styles.description}>
                  {ticket.Description !== null
                    ? ticket.Description
                    : "No Description"}
                </Typography>
              </Grid>

              <Divider className={styles.bottomDivider} />
              <div className={styles.chipField}>
                {selectedTagsChips.length === 0 ? (
                  <Chip label="No Tags" key="none" />
                ) : (
                  selectedTagsChips
                )}
              </div>
            </Grid>

            <Grid
              container
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              alignContent="flex-start"
            >
              <Grid
                container
                spacing={1}
                justifyContent="flex-end"
                alignContent="center"
              >
                <Grid
                  container
                  item
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography
                    className={styles.info}
                    style={{ paddingRight: "5px" }}
                  >
                    {"Submitted By:"}
                  </Typography>
                  <Chip label={fullName} className={styles.assignedChip} />
                </Grid>
                <Grid
                  container
                  item
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography
                    className={styles.info}
                    style={{ paddingRight: "5px" }}
                  >
                    {"Assigned To:"}
                  </Typography>
                  <Chip
                    label={
                      ticket.TechnicianID !== null
                        ? getTechnicianName()
                        : "Unassigned"
                    }
                    className={
                      ticket.TechnicianID !== null ? styles.assignedChip : ""
                    }
                  />
                </Grid>
                <Grid
                  container
                  item
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography
                    className={styles.info}
                    style={{ paddingRight: "5px" }}
                  >
                    {"Priority:"}
                  </Typography>
                  <Chip
                    // className={styles.infoChip}
                    label={ticket.Priority !== null ? ticket.Priority : "None"}
                    style={
                      ticket.Priority !== null
                        ? ticket.Priority === "High"
                          ? { backgroundColor: "#ff0000", color: "#ffffff" }
                          : ticket.Priority === "Medium" ||
                            ticket.Priority === "Normal"
                          ? { backgroundColor: "#ffd700", color: "#000000" }
                          : ticket.Priority === "Low"
                          ? { backgroundColor: "#0000ff", color: "#ffffff" }
                          : {}
                        : {}
                    }
                  />
                </Grid>
                <Grid
                  container
                  item
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography className={styles.info}>
                    {"Submitted: "}
                    {ticket.SubmittedDate !== null
                      ? moment(ticket.SubmissionDate).format("LL")
                      : "Never"}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography className={styles.info}>
                    {"Last Modified: "}
                    {ticket.LastModified !== null
                      ? moment(ticket.SubmissionDate).format("LL")
                      : "Never"}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                >
                  <Typography className={styles.info}>
                    {"Status: "}
                    {ticket.Status !== null
                      ? ticket.Status
                      : ""}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {userRole !== "Basic" && (
        <Menu
          anchorEl={anchorEl}
          id="ticket-options"
          keepMounted
          open={Boolean(optionsOpen)}
          onClose={handleTicketOptionsClose}
          getContentAnchorEl={null}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          {(userRole === "Admin" || userRole === "Tech") &&
            ticket.TechnicianID === null && (
              <MenuItem onClick={handleAssignToSelf}>
                <ListItemIcon>
                  <AssignmentReturnIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" color="textPrimary">
                      Assign To Self
                    </Typography>
                  }
                />
              </MenuItem>
            )}

          {((userRole === "Tech" && ticket.TechnicianID === userID) ||
            (userRole === "Admin" && ticket.TechnicianID !== null)) && (
            <MenuItem onClick={handleUnassign}>
              <ListItemIcon>
                <RemoveCircleIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" color="textPrimary">
                    Unassign
                  </Typography>
                }
              />
            </MenuItem>
          )}

          {userRole === "Admin" && (
            <MenuItem onClick={handleAssignOpen}>
              <ListItemIcon>
                <AssignmentIndIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" color="textPrimary">
                    Assign to Tech
                  </Typography>
                }
              />
            </MenuItem>
          )}

          {userRole === "Admin" && (
            <MenuItem onClick={handleAutoAssignOpen}>
              <ListItemIcon>
                <AutorenewIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" color="textPrimary">
                    Auto-Assign to Tech
                  </Typography>
                }
              />
            </MenuItem>
          )}

          {(ticket.Priority === "Low" || ticket.Priority === "Medium") &&
            (userRole === "Admin" || userRole === "Tech") && (
              <MenuItem onClick={handleRaisePriority}>
                <ListItemIcon>
                  <ArrowUpwardIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" color="textPrimary">
                      Raise Priority
                    </Typography>
                  }
                />
              </MenuItem>
            )}

          {(ticket.Priority === "High" || ticket.Priority === "Medium") &&
            (userRole === "Admin" || userRole === "Tech") && (
              <MenuItem onClick={handleLowerPriority}>
                <ListItemIcon>
                  <ArrowDownwardIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" color="textPrimary">
                      Lower Priority
                    </Typography>
                  }
                />
              </MenuItem>
            )}

          {(((userRole === "Tech" && ticket.TechnicianID === userID) ||
            (userRole === "Admin" && ticket.TechnicianID !== null)) &&
            (ticket.Status === "Open")) && (
            <MenuItem onClick={handleCloseTicket}>
              <ListItemIcon>
                <CancelIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" color="textPrimary">
                    Close Ticket
                  </Typography>
                }
              />
            </MenuItem>
          )}

          {(userRole === "Admin") && (
            <MenuItem onClick={handleDeleteTicket}>
              <ListItemIcon>
                <DeleteIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body1" color="textPrimary">
                    Delete Ticket
                  </Typography>
                }
              />
            </MenuItem>
          )}
        </Menu>
      )}

      <AssignToTechnician
        open={openAssign}
        handleOpen={handleAssignOpen}
        handleClose={handleAssignClose}
        setSelected={setSelected}
        ticketID={ticket.ID}
        ticketTags={selectedTags}
      />

      <AutoAssignToTechnician
        open={openAutoAssign}
        handleOpen={handleAutoAssignOpen}
        handleClose={handleAutoAssignClose}
        ticketID={ticket.ID}
      />

      <NotesMessages
        open={openNotesMessages}
        handleOpen={handleNotesMessagesOpen}
        handleClose={handleNotesMessagesClose}
        ticketID={ticket.ID}
      />

    </>
  );
};

export default TicketCard;
