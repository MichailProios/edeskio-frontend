import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import {
  IconButton,
  Tooltip,
  Badge,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";

import { NotificationsNone } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import InfoIcon from "@material-ui/icons/Info";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector, useStore } from "react-redux";

import { endpoints } from "../../redux/user/userEndpoints";
import {
  notificationClearAction,
  notificationsAction,
} from "../../redux/user/userActions";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  notificationIcon: {
    color: "#fff",
    fontSize: "1.2em",
    [theme.breakpoints.down("xs")]: {
      color: theme.palette.secondary.light,
      fontSize: "1.5em",
    },
  },

  notificationButton: {
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      color: "rgba(0, 0, 0, 0.54)",
      fontSize: "1.5em",
    },
  },

  notificationBadge: {
    fontSize: "1.5em",
  },
}));

const Notifications = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const notifications = useSelector((state) => state.User.notifications);
  const notification = useSelector((state) => state.User.notification);
  const userID = useSelector((state) => state.User.user.tblUser.ID);

  const socketRef = useRef();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    dispatch(notificationClearAction());
  }, [dispatch]);

  useEffect(() => {
    socketRef.current = io.connect(endpoints.notificationsWS);

    socketRef.current.on("connect", () => {
      setConnected(socketRef.current.connected);
    });

    return () => socketRef.current.disconnect();
  }, []);

  useEffect(() => {
    if (connected) {
      socketRef.current.on("notificationNew", ({ notifications }) => {
        dispatch(notificationsAction(notifications));
      });
    }
  }, [dispatch, connected]);

  useEffect(() => {
    if (connected) {
      socketRef.current.emit("notificationNew", { userID, notification });
    }

    dispatch(notificationClearAction());
  }, [userID, notification, dispatch, connected]);

  const handleOptionsClick = (e) => {
    setOptionsOpen(true);
    setAnchorEl(e.currentTarget);
  };

  const handleOptionsClose = (e) => {
    setOptionsOpen(false);
    setAnchorEl(null);
  };

  const handleNotificationClick = (value) => {
    const content = value.Content;
    const notificationID = value.ID;

    if (content.toLowerCase().includes("ticket")) {
      navigate("/Dashboard/SubmittedTickets");
    }

    socketRef.current.emit("notificationRead", { notificationID });

    setOptionsOpen(false);
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        className={styles.notificationButton}
        onClick={handleOptionsClick}
      >
        <Badge
          badgeContent={notifications.length}
          color="error"
          overlap="rectangular"
        >
          <Tooltip title="Notifications" placement="bottom">
            {notifications.length > 0 ? (
              <NotificationsIcon className={styles.notificationIcon} />
            ) : (
              <NotificationsNone className={styles.notificationIcon} />
            )}
          </Tooltip>
        </Badge>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="ticket-options"
        keepMounted
        open={Boolean(optionsOpen)}
        onClose={handleOptionsClose}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
      >
        {notifications.map((value, index) => {
          if (!value.Read) {
            return (
              <MenuItem
                key={index}
                onClick={(e) => handleNotificationClick(value)}
              >
                <ListItemIcon>
                  <InfoIcon color="primary" />
                </ListItemIcon>

                <ListItemText
                  primary={
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      align="left"
                    >
                      {value["tblUser.FirstName"]} {value["tblUser.LastName"]}{" "}
                      {value.Content}
                    </Typography>
                  }
                />
              </MenuItem>
            );
          } else {
            return <div />;
          }
        })}
      </Menu>
    </>
  );
};

export default Notifications;
