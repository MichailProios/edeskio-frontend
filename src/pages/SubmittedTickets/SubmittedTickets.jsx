import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MaterialTable from "@material-table/core";

import { useParams, useLocation, useNavigate } from "react-router-dom";

import { tableIcons } from "../../utilities/DataTable/DataTableIcons.jsx";

import {
  Grow,
  Grid,
  IconButton,
  Button,
  Typography,
  Divider,
  TextField,
  InputAdornment,
  Tooltip,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import {
  BsSortAlphaDown,
  BsSortAlphaUpAlt,
  BsCardHeading,
  BsCardChecklist,
  BsSortNumericDown,
  BsSortNumericUpAlt,
  BsChevronBarUp,
  BsChevronBarExpand,
  BsChevronBarDown,
  BsArrowCounterclockwise,
  BsFillTagsFill,
} from "react-icons/bs";

import CloseIcon from "@material-ui/icons/Close";

import SortIcon from "@material-ui/icons/Sort";

import { makeStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";

import TicketCard from "../../components/Tickets/TicketCard.jsx";

import PageHeader from "../../components/PageHeader/PageHeader";
import { ContactsOutlined, Search } from "@material-ui/icons";
import { getTicketsAction } from "../../redux/user/userActions.js";

import CircularLoading from "../../components/CircularLoading/CircularLoading.jsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5em",
  },
  search: {
    width: "100%",
    padding: "1.5em",
    userSelect: "none",
  },
  menuIcons: {
    color: theme.palette.primary.main,
    fontSize: "2em",
  },
  icon: {
    fontSize: "2em",
  },
}));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SubmittedTickets = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const userID = useSelector((state) => state.User.user.tblUser.ID);
  const userRole = useSelector((state) => state.User.user.tblAccess.RoleName);
  const tickets = useSelector((state) => state.User.tickets.tblTickets);

  // const loading = useSelector((state) => state.User.loading);

  const [original, setOriginal] = useState(tickets);

  const [loading, setLoading] = useState(true);
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  const query = useQuery();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const results = tickets.filter(
      (element) =>
        element.Subject.toLowerCase().includes(searchTerm) ||
        element.ID.toString().toLowerCase().includes(searchTerm)

      // element.ID.toLowerCase().includes(searchTerm)
    );
    setFilteredTickets(results);
  }, [searchTerm]);

  const organizationID = useSelector(
    (state) => state.User.user.tblOrganization.ID
  );

  useEffect(() => {
    if (typeof tickets !== "undefined") {
      setFilteredTickets(
        tickets.filter((row) => {
          if (userRole === "Basic") {
            return row.tblUser.ID === userID;
          } else {
            return row;
          }
        })
      );
    }
  }, [tickets, userID, userRole]);

  useEffect(() => {
    let isMounted = true;

    if (organizationID) {
      dispatch(getTicketsAction(organizationID)).then((result) => {
        if (result.tickets[0].status === 200) {
          const id = query.get("id");
          if (id) {
            if (isMounted) {
              setSearchTerm(query.get("id"));
            }
          }
        }
      });
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch, organizationID]);

  const delayTime = (index) => {
    return 150 * index;
  };

  useEffect(() => {
    let timerId;

    if (loading) {
      timerId = setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    return () => clearTimeout(timerId);
  }, [loading]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSortOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleSortCLose = (e) => {
    setAnchorEl(null);
  };

  const sortNameAscending = () => {
    setAnchorEl(null);
    setSelectedIndex(0);

    const copy = [...filteredTickets];

    copy.sort((a, b) => a.Subject.localeCompare(b.Subject));

    setFilteredTickets(copy);
  };

  const sortNameDescending = () => {
    setAnchorEl(null);
    setSelectedIndex(1);

    const copy = [...filteredTickets];

    copy.sort((a, b) => b.Subject.localeCompare(a.Subject));

    setFilteredTickets(copy);
  };

  const sortDateAscending = () => {
    setAnchorEl(null);
    setSelectedIndex(2);

    const copy = [...filteredTickets];

    copy.sort(
      (a, b) => new Date(a.SubmissionDate) - new Date(b.SubmissionDate)
    );

    setFilteredTickets(copy);
  };

  const sortDateDescending = () => {
    setAnchorEl(null);
    setSelectedIndex(3);

    const copy = [...filteredTickets];

    copy.sort(
      (a, b) => new Date(b.SubmissionDate) - new Date(a.SubmissionDate)
    );

    setFilteredTickets(copy);
  };

  const sortPriorityHigh = () => {
    setAnchorEl(null);
    setSelectedIndex(4);

    const copy = [...filteredTickets];

    setFilteredTickets(copy.filter((row) => row.Priority === "High"));
  };

  const sortPriorityMedium = () => {
    setAnchorEl(null);
    setSelectedIndex(5);

    const copy = [...filteredTickets];

    setFilteredTickets(copy.filter((row) => row.Priority === "Medium"));
  };

  const sortPriorityLow = () => {
    setAnchorEl(null);
    setSelectedIndex(6);

    const copy = [...filteredTickets];

    setFilteredTickets(copy.filter((row) => row.Priority === "Low"));
  };

  const sortUnassigned = () => {
    setAnchorEl(null);
    setSelectedIndex(7);

    const copy = [...filteredTickets];

    setFilteredTickets(copy.filter((row) => row.TechnicianID === null));
  };

  const sortAssigned = () => {
    setAnchorEl(null);
    setSelectedIndex(8);

    const copy = [...filteredTickets];

    setFilteredTickets(
      copy.filter(
        (row) => row.TechnicianID !== null && row.TechnicianID === userID
      )
    );
  };

  const techExpertiseTags = useSelector(
    (state) => state.User.expertiseTags_All
  );

  const sortReset = () => {
    setAnchorEl(null);
    setSelectedIndex(null);

    setFilteredTickets(tickets);
  };

  if (!loading) {
    return (
      <div className={styles.root}>
        <PageHeader title="Tickets" />
        <Grow in={true} timeout={50}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid
              container
              item
              justifyContent="flex-start"
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
            />
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
              <TextField
                className={styles.search}
                autoFocus={true}
                placeholder="Search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                name="Search"
                margin="none"
                fullWidth={true}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={(e) => setSearchTerm("")}
                      >
                        <CloseIcon className={styles.searchIcons} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid
              container
              item
              xs={2}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              justifyContent="flex-end"
            >
              <Tooltip title="Sort">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={(e) => handleSortOpen(e)}
                >
                  <SortIcon className={styles.icon} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grow>

        <Grid container spacing={2}>
          {filteredTickets.map((value, index) => (
            <Grow in={true} timeout={delayTime(index + 1)} key={index}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <TicketCard
                  ticket={{
                    Subject: value.Subject,
                    ID: value.ID,
                    TechnicianID: value.TechnicianID,
                    Description: value.Description,
                    SubmissionDate: value.SubmissionDate,
                    LastModified: value.LastModified,
                    Priority: value.Priority,
                    tblUser: value.tblUser,
                  }}
                />
              </Grid>
            </Grow>
          ))}
        </Grid>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleSortCLose}
          getContentAnchorEl={null}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <MenuItem selected={selectedIndex === 0} onClick={sortNameAscending}>
            <ListItemIcon>
              <BsSortAlphaDown className={styles.menuIcons} />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography variant="body1" color="textPrimary">
                  Subject Ascending
                </Typography>
              }
            />
          </MenuItem>
          <MenuItem selected={selectedIndex === 1} onClick={sortNameDescending}>
            <ListItemIcon>
              <BsSortAlphaUpAlt className={styles.menuIcons} />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography variant="body1" color="textPrimary">
                  Subject Descending
                </Typography>
              }
            />
          </MenuItem>
          <Divider />
          <MenuItem selected={selectedIndex === 2} onClick={sortDateAscending}>
            <ListItemIcon>
              <BsSortNumericDown className={styles.menuIcons} />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography variant="body1" color="textPrimary">
                  Date Ascending
                </Typography>
              }
            />
          </MenuItem>
          <MenuItem selected={selectedIndex === 3} onClick={sortDateDescending}>
            <ListItemIcon>
              <BsSortNumericUpAlt className={styles.menuIcons} />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography variant="body1" color="textPrimary">
                  Date Descending
                </Typography>
              }
            />
          </MenuItem>
          <Divider />
          <MenuItem selected={selectedIndex === 4} onClick={sortPriorityHigh}>
            <ListItemIcon>
              <BsChevronBarUp className={styles.menuIcons} />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography variant="body1" color="textPrimary">
                  Priority High
                </Typography>
              }
            />
          </MenuItem>
          <MenuItem selected={selectedIndex === 5} onClick={sortPriorityMedium}>
            <ListItemIcon>
              <BsChevronBarExpand className={styles.menuIcons} />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography variant="body1" color="textPrimary">
                  Priority Medium
                </Typography>
              }
            />
          </MenuItem>
          <MenuItem selected={selectedIndex === 6} onClick={sortPriorityLow}>
            <ListItemIcon>
              <BsChevronBarDown className={styles.menuIcons} />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography variant="body1" color="textPrimary">
                  Priority Low
                </Typography>
              }
            />
          </MenuItem>

          <Divider />
          <MenuItem selected={selectedIndex === 7} onClick={sortUnassigned}>
            <ListItemIcon>
              <BsCardHeading className={styles.menuIcons} />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography variant="body1" color="textPrimary">
                  Unassigned Only
                </Typography>
              }
            />
          </MenuItem>
          <MenuItem selected={selectedIndex === 8} onClick={sortAssigned}>
            <ListItemIcon>
              <BsCardChecklist className={styles.menuIcons} />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography variant="body1" color="textPrimary">
                  Assigned Only
                </Typography>
              }
            />
          </MenuItem>

          <Divider />
          <MenuItem onClick={sortReset}>
            <ListItemIcon>
              <BsArrowCounterclockwise className={styles.menuIcons} />
            </ListItemIcon>

            <ListItemText
              primary={
                <Typography variant="body1" color="textPrimary">
                  Reset
                </Typography>
              }
            />
          </MenuItem>
        </Menu>
      </div>
    );
  } else {
    return (
      <div className={styles.root}>
        <PageHeader title="Tickets" />
        <Grid container spacing={2}>
          <Grow in={true} timeout={50}>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid
                container
                item
                justifyContent="flex-start"
                xs={2}
                sm={2}
                md={2}
                lg={2}
                xl={2}
              />
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
                <TextField
                  className={styles.search}
                  autoFocus={true}
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  name="Search"
                  margin="none"
                  fullWidth={true}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={(e) => setSearchTerm("")}
                        >
                          <CloseIcon className={styles.searchIcons} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid
                container
                item
                xs={2}
                sm={2}
                md={2}
                lg={2}
                xl={2}
                justifyContent="flex-end"
              >
                <Tooltip title="Sort">
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={(e) => handleSortOpen(e)}
                  >
                    <SortIcon className={styles.icon} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grow>
        </Grid>
        <CircularLoading />
      </div>
    );
  }
};

export default SubmittedTickets;
