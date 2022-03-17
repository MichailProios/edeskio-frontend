import React, { useState, useEffect } from "react";

//Material-UI Styles
import { makeStyles, useTheme } from "@material-ui/styles";

import { Slide, Paper, Grid, TextField, Card, CardContent, Typography, CardHeader, Divider } from "@material-ui/core";

import Register from "../../components/Register/Register";

import Login from "../../components/Login/Login";

import { useSelector, useDispatch } from "react-redux";
import { getUserOrganizationAction } from "../../redux/user/userActions";

const useStyles = makeStyles({
  root: {
    margin: "1.5em",
  },
  ticketCard: {
    width: "80%"
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
  }
});

const data = [
{
  ID: "0001",
  UserID: "1",
  TechnicianID: "9",
  Subject: "Database Error",
  Description: "Could not open a connection to SQL Server",
  Status: "",
  Priority: "Medium",
  SubmissionDate: "2022-03-17",
  LastModified: "2022-03-17",
  OpenDate: "",
  ClosedDate: "",
},
{
  ID: "0002",
  UserID: "1",
  TechnicianID: "8",
  Subject: "Can't Navigate Website",
  Description: "What is a hamburger menu icon?",
  Status: "",
  Priority: "High",
  SubmissionDate: "2022-03-17",
  LastModified: "2022-03-17",
  OpenDate: "",
  ClosedDate: "",
},
{
  ID: "0003",
  UserID: "1",
  TechnicianID: "1",
  Subject: "Ticket Subject",
  Description: "Ticket Description",
  Status: "",
  Priority: "High",
  SubmissionDate: "2022-03-17",
  LastModified: "2022-03-17",
  OpenDate: "",
  ClosedDate: "",
},
{
  ID: "0004",
  UserID: "1",
  TechnicianID: "1",
  Subject: "Ticket Subject",
  Description: "Ticket Description",
  Status: "",
  Priority: "High",
  SubmissionDate: "2022-03-17",
  LastModified: "2022-03-17",
  OpenDate: "",
  ClosedDate: "",
},
{
  ID: "0005",
  UserID: "1",
  TechnicianID: "1",
  Subject: "Ticket Subject",
  Description: "Ticket Description",
  Status: "",
  Priority: "High",
  SubmissionDate: "2022-03-17",
  LastModified: "2022-03-17",
  OpenDate: "",
  ClosedDate: "",
},
{
  ID: "0006",
  UserID: "1",
  TechnicianID: "1",
  Subject: "Ticket Subject",
  Description: "Ticket Description",
  Status: "",
  Priority: "High",
  SubmissionDate: "2022-03-17",
  LastModified: "2022-03-17",
  OpenDate: "",
  ClosedDate: "",
},
{
  ID: "0007",
  UserID: "1",
  TechnicianID: "1",
  Subject: "Ticket Subject",
  Description: "Ticket Description",
  Status: "",
  Priority: "High",
  SubmissionDate: "2022-03-17",
  LastModified: "2022-03-17",
  OpenDate: "",
  ClosedDate: "",
},
{
  ID: "0008",
  UserID: "1",
  TechnicianID: "1",
  Subject: "Ticket Subject",
  Description: "Ticket Description",
  Status: "",
  Priority: "High",
  SubmissionDate: "2022-03-17",
  LastModified: "2022-03-17",
  OpenDate: "",
  ClosedDate: "",
},
{
  ID: "0009",
  UserID: "1",
  TechnicianID: "1",
  Subject: "Ticket Subject",
  Description: "Ticket Description",
  Status: "",
  Priority: "High",
  SubmissionDate: "2022-03-17",
  LastModified: "2022-03-17",
  OpenDate: "",
  ClosedDate: "",
},
];


const TechDashboard = () => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [ticketData, setTicketData] = useState(data);
    //setTicketData(data);

    console.log(data[0]);

  return (
    <>
      <div className={styles.root}>
        {/*<Grid container spacing={4}>*/}
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
        {ticketData.map((ticket) => {
          console.log("T", ticket);
          return (
            <Grid item className={styles.ticketCard}>
            <Card>
              <CardContent>
                <Typography className={styles.subject}>
                  {ticket.Subject}
                </Typography>
                <a href="/" className={styles.ticketID}>
                  Ticket #{ticket.ID}
                </a>
                <Divider />
                <Typography className={styles.description}>
                  {ticket.Description}
                </Typography>
              </CardContent>
            </Card>
            </Grid>
          );
        })
        }
        </Grid>
      </div>
    </>
  );
};

export default TechDashboard;
