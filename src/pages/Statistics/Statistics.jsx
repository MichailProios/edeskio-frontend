import React, { useEffect, useState, useCallback } from "react";

// Redux State
import { useSelector, useDispatch } from "react-redux";

//Material-UI
import {
  Grow,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@material-ui/core";

// Basic Components
import PageHeader from "../../components/PageHeader/PageHeader.jsx";

import * as color from "@material-ui/core/colors";

import { makeStyles } from "@material-ui/core/styles";

// import {
//   BarChart,
//   Bar,
//   Cell,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
//   Label,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Line,
// } from "recharts";
import { useTheme } from "@material-ui/styles";
import {
  getStatisticsAction,
  getTagCategoriesAction,
  getTechniciansAssignAction,
  getTicketsAction,
} from "../../redux/user/userActions.js";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import autocolors from "chartjs-plugin-autocolors";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend
);

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5em",
  },

  cardRoot: {
    margin: "1em",
  },

  cardContent: {
    height: "25em",
  },
}));

function shuffleArray(array) {
  const newArray = [...array];

  for (var i = newArray.length - 1; i > 0; i--) {
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));

    var temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }

  return newArray;
}

const Statistics = () => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const statistics = useSelector((state) => state.User.statistics);

  const organizationID = useSelector(
    (state) => state.User.user.tblOrganization.ID
  );

  const userID = useSelector((state) => state.User.user.tblUser.ID);

  useEffect(() => {
    if (organizationID) {
      dispatch(getStatisticsAction(organizationID));
    }
  }, [dispatch, userID, organizationID]);

  const colorsArray = Object.values(color).map((row) => {
    return typeof row["800"] !== "undefined" ? row["800"] : "#f3f3f3";
  });

  return (
    <Grow in={true} timeout={50}>
      <div className={styles.root}>
        <PageHeader title={"Statistics"} showBreadcrumbs={false} />
        <Paper elevation={10}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card raised={true} className={styles.cardRoot}>
                <CardHeader title="Ticket Status" />
                <Divider />
                <CardContent className={styles.cardContent}>
                  <Bar
                    data={{
                      labels: ["Open", "Closed", "Pending"],
                      datasets: [
                        {
                          data: statistics.ticketsStatus[0],
                          label: "Last 7 Days",
                          backgroundColor: shuffleArray(colorsArray),
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,

                      plugins: {
                        legend: {
                          display: false,
                          // legendText: ["test"],
                        },
                        autocolors: {
                          autocolors,
                          mode: "data",
                        },
                      },
                      parsing: {
                        xAxisKey: "Status",
                        yAxisKey: "Number",
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card raised={true} className={styles.cardRoot}>
                <CardHeader title="Active Tickets" />
                <Divider />
                <CardContent className={styles.cardContent}>
                  <Bar
                    data={{
                      //labels: ["FullName"],
                      datasets: [
                        {
                          data: statistics.ticketsActiveTech[0],
                          label: "Number of Active Open Tickets",
                          backgroundColor: shuffleArray(colorsArray),
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      indexAxis: "y",
                      plugins: {
                        legend: {
                          display: false,
                        },
                        autocolors: {
                          mode: "data",
                        },
                      },
                      parsing: {
                        yAxisKey: "FullName",
                        xAxisKey: "ActiveTickets",
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card raised={true} className={styles.cardRoot}>
                <CardHeader title="Unresolved Tickets" />
                <Divider />
                <CardContent className={styles.cardContent}>
                  <Pie
                    data={{
                      labels: statistics.ticketsActiveTech[0].map(
                        (row) => row.FullName
                      ),
                      datasets: [
                        {
                          data: statistics.ticketsActiveTech[0],
                          label: "Number of Active Open Tickets",
                          backgroundColor: shuffleArray(colorsArray),
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      // indexAxis: "y",
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                      parsing: {
                        key: "ActiveTickets",
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </div>
    </Grow>
  );
};

export default Statistics;
