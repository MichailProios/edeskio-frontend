import React from "react";

import { IconButton, Tooltip, Badge } from "@material-ui/core";

import { NotificationsNone } from "@material-ui/icons";

import { makeStyles, useTheme } from "@material-ui/core/styles";

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

  return (
    <>
      <IconButton className={styles.notificationButton}>
        <Badge badgeContent={2} color="error" overlap="rectangular">
          <Tooltip title="Notifications" placement="bottom">
            <NotificationsNone className={styles.notificationIcon} />
          </Tooltip>
        </Badge>
      </IconButton>
    </>
  );
};

export default Notifications;
