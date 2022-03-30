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

const useStyles = makeStyles({
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
});

const TicketCard = ({ ticket }) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

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

  return (
    <React.Fragment>
      <Card elevation={10}>
        <CardHeader
          title={ticket.Subject}
          subheader={
            ticket.TechnicianID === userID
              ? `Ticket ID: ${ticket.ID} | Assigned: ${
                  userFirstName + " " + userLastName
                }`
              : `Ticket ID: ${ticket.ID} | Unassigned`
          }
          action={
            <IconButton onClick={handleTicketOptionsClick}>
              <MoreVert />
            </IconButton>
          }
        />

        <Divider />
        <CardContent>
          <Typography className={styles.description}>
            {ticket.Description}
          </Typography>
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
