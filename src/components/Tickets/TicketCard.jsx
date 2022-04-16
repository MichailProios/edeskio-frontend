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
} from "@material-ui/core";

import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

import { useSelector, useDispatch } from "react-redux";
import {
  getUserOrganizationAction,
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
import AssignToTechnician from "../AssignToTechnician/AssignToTechnician";

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

      if (tagFromtbl.Category === "Operating System") {
        newChips.push(
          <Chip
            label={tag}
            key={tag}
            style={{ backgroundColor: "#3399ff", color: "#ffffff" }}
          />
        );
      } else if (tagFromtbl.Category === "Hardware") {
        newChips.push(
          <Chip
            label={tag}
            key={tag}
            style={{ backgroundColor: "#cc0000", color: "#ffffff" }}
          />
        );
      } else if (tagFromtbl.Category === "Software") {
        newChips.push(
          <Chip
            label={tag}
            key={tag}
            style={{ backgroundColor: "#0000ff", color: "#ffffff" }}
          />
        );
      }
    });

    setSelectedTagsChips(newChips);
  };

  const tblTags = useSelector((state) => state.User.tags.tblTags);

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
    setAnchorEl(e.currentTarget);
  };

  const handleTicketOptionsClose = (e) => {
    setOptionsOpen(false);
    setAnchorEl(null);
  };

  const userID = useSelector((state) => state.User.user.tblUser.ID);
  const userRole = useSelector((state) => state.User.user.tblAccess.RoleName);

  const userFirstName = useSelector(
    (state) => state.User.user.tblUser.FirstName
  );
  const userLastName = useSelector((state) => state.User.user.tblUser.LastName);

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

  useEffect(() => {
    getTagChips(selectedTags);
  }, [selectedTags]);

  const [openAssign, setOpenAssign] = useState(false);

  const handleAssignOpen = () => {
    setOpenAssign(true);
    setOptionsOpen(false);
    setAnchorEl(null);
  };

  const handleAssignClose = () => {
    setOpenAssign(false);
  };

  const [selected, setSelected] = useState("");

  const getTechnicianName = () => {
    const tech = techs.find((record) => record.ID === ticket.TechnicianID);

    if (tech)
    {
      return tech.FirstName + " " + tech.LastName;
    }
    else
    {
      return "Unassigned"
    }
  }

  return (
    <>
      <Card elevation={10} className={styles.card}>
        <CardHeader
          title={ticket.Subject}
          subheader={`Ticket ID: ${ticket.ID}`}
          action={
            userRole !== "Bc" && (
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
              // style={{ borderRight: "1.5px solid #e0e0e0" }}
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
                    {"Assigned To:"}
                  </Typography>
                  <Chip
                    label={ticket.TechnicianID !== null ? getTechnicianName() : "Unassigned"}
                    className={ticket.TechnicianID !== null ? styles.assignedChip : ""}
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
          PaperProps={{
            elevation: 3,
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          {userRole === "Admin" || userRole === "Tech" ? (
            <MenuItem onClick={handleAssignToSelf}>
              <AssignmentReturnIcon color="primary" />
              &nbsp;Assign To Self
            </MenuItem>
          ) : (
            <div />
          )}

          {userRole === "Admin" ? (
            <MenuItem onClick={handleAssignOpen}>
              <AssignmentIndIcon color="primary" />
              Assign to Tech
            </MenuItem>
          ) : (
            <div />
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
    </>
  );
};

export default TicketCard;
