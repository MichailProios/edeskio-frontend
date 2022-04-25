import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

import { IconButton, Tooltip, Badge } from "@material-ui/core";

import { NotificationsNone } from "@material-ui/icons";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch, useSelector, useStore } from "react-redux";

import { endpoints } from "../../redux/user/userEndpoints";
import { notificationsAction } from "../../redux/user/userActions";

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

  const notifications = useSelector((state) => state.User.notifications);
  const notification = useSelector((state) => state.User.notification);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(endpoints.notificationsWS);

    socketRef.current.on("notificationNew", ({ notifications }) => {
      dispatch(notificationsAction(notifications));
    });

    socketRef.current.emit("notificationNew", { notification });

    return () => socketRef.current.disconnect();
  }, [notification, dispatch]);

  // const onMessageSubmit = (e) => {
  //   socketRef.current.emit("notificationNew", { currentNotification });
  // };

  return (
    <>
      <IconButton className={styles.notificationButton}>
        <Badge
          badgeContent={notifications.length}
          color="error"
          overlap="rectangular"
        >
          <Tooltip title="Notifications" placement="bottom">
            <NotificationsNone className={styles.notificationIcon} />
          </Tooltip>
        </Badge>
      </IconButton>
    </>
  );
};

export default Notifications;
