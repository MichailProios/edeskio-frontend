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

import { useSelector, useDispatch } from "react-redux";
import {
  getUserOrganizationAction,
  putTicketsSelfAssignAction,
} from "../../redux/user/userActions";
import {
  DeleteForever,
  HighlightOff,
  MoreVert,
  TrendingUp,
} from "@material-ui/icons";

import moment from "momnet";

import AssignmentReturnIcon from "@material-ui/icons/AssignmentReturn";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1.5em",
  },
  ticketCard: {
    width: "80%",
  },
  cardHeader: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
  },
  cardFooter: {
    display: "flex",
    justifyContent: "flex-end",
  },
  subject: {
    fontSize: "14pt",
  },
  ticketID: {
    fontSize: "12pt",
  },
  description: {
    fontSize: "10pt",
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
  info: {
    fontSize: "12pt",
  },
  assignedChip: {
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
  },
}));

const tags = [
  {
    Type: "Windows 11",
    Category: "Operating System",
  },
  {
    Type: "Desktop",
    Category: "Hardware",
  },
  {
    Type: "Website",
    Category: "Software",
  },
];

const TicketCard = ({ ticket }) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const [tagChips, setTagChips] = useState([]);

  useEffect(() => {
    setTagChips(getTagChips);
  }, [tags]);

  const handleTicketOptionsClick = (e) => {
    setOptionsOpen(true);
    setAnchorEl(e.currentTarget);
  };

  const handleTicketOptionsClose = (e) => {
    setOptionsOpen(false);
    setAnchorEl(null);
  };

  const userID = useSelector((state) => state.User.user.tblUser.ID);
  const userFirstName = useSelector(
    (state) => state.User.user.tblUser.FirstName
  );
  const userLastName = useSelector((state) => state.User.user.tblUser.LastName);

  const handleAssignToSelf = () => {
    dispatch(
      putTicketsSelfAssignAction(
        ticket.ID,
        userID,
        moment().format("YYYY-MM-DD HH:mm:ss")
      )
    );

    setOptionsOpen(false);
    setAnchorEl(null);
  };

  const getTagChips = () => {
    let tagChips = [];

    // ticket.tags.forEach({
    tags.forEach((tag) => {
      if (tag.Category === "Operating System") {
        tagChips.push(
          <Chip
            label={tag.Type}
            key={tag.Type}
            style={{ backgroundColor: "#3399ff", color: "#ffffff" }}
          />
        );
      } else if (tag.Category === "Hardware") {
        tagChips.push(
          <Chip
            label={tag.Type}
            key={tag.Type}
            style={{ backgroundColor: "#cc0000", color: "#ffffff" }}
          />
        );
      } else if (tag.Category === "Software") {
        tagChips.push(
          <Chip
            label={tag.Type}
            key={tag.Type}
            style={{ backgroundColor: "#0000ff", color: "#ffffff" }}
          />
        );
      }
    });

    return tagChips;
  };

  return (
    <React.Fragment>
      <Card elevation={10}>
        <CardHeader
          title={ticket.Subject}
          subheader={`Ticket ID: ${ticket.ID}`}
          action={
            <IconButton onClick={handleTicketOptionsClick}>
              <MoreVert />
            </IconButton>
          }
        />
        <Divider />
        <CardContent>
          <Grid
            container
            item
            justifyContent="flex-end"
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
          >
            <Grid
              container
              item
              justifyContent="flex-start"
              xs={9}
              sm={9}
              md={9}
              lg={9}
              xl={9}
              style={{ borderRight: "1.5px solid #e0e0e0" }}
            >
              <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
                <Typography className={styles.description}>
                  {ticket.Description !== null
                    ? ticket.Description
                    : "No Description"}
                </Typography>
              </Grid>

              <Grid
                container
                item
                xs={9}
                sm={9}
                md={9}
                lg={9}
                xl={9}
                alignContent="flex-end"
              >
                <div className={styles.chipField}>
                  {tagChips.length === 0 ? (
                    <Chip label="No Tags" key="none" />
                  ) : (
                    tagChips
                  )}
                </div>
              </Grid>
            </Grid>
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
              xs={3}
              sm={3}
              md={3}
              lg={3}
              xl={3}
              style={{ paddingLeft: "1em" }}
            >
              <Grid
                container
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
                  // className={styles.infoChip}
                  label={
                    ticket.TechnicianID !== null
                      ? ticket.TechnicianID == userID
                        ? userFirstName + " " + userLastName
                        : ticket.TechnicianID
                      : "Unassigned"
                  }
                  className={
                    ticket.TechnicianID !== null ? styles.assignedChip : ""
                  }
                />
              </Grid>
              <Grid
                container
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
              <Typography className={styles.info}>
                {"Submitted: "}
                {ticket.SubmittedDate !== null
                  ? moment(ticket.SubmissionDate).format("LL")
                  : "Never"}
              </Typography>
              <Typography className={styles.info}>
                {"Last Modified: "}
                {ticket.LastModified !== null
                  ? moment(ticket.SubmissionDate).format("LL")
                  : "Never"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
        <MenuItem onClick={handleAssignToSelf}>
          <AssignmentReturnIcon color="primary" />
          &nbsp;Assign To Self
        </MenuItem>
        {/* <MenuItem>
          <TrendingUp />
          &nbsp;Elevate Ticket
        </MenuItem>
        <MenuItem>
          <DeleteForever />
          &nbsp;Delete Ticket
        </MenuItem> */}
      </Menu>
    </React.Fragment>
  );
};

export default TicketCard;
