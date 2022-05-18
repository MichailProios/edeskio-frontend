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

// Note: changes to the plugin code is not reflected to the chart, because the plugin is loaded at chart construction time and editor changes only trigger an chart.update().
const plugin = {
  id: "custom_canvas_background_color",
  beforeDraw: (chart) => {
    const ctx = chart.canvas.getContext("2d");
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "lightGreen";
    ctx.fillRect(0, 0, chart.width, chart.height);
    ctx.restore();
  },
};

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
    return typeof row["800"] !== "undefined" ? row["800"] : "#455a64";
  });

  return (
    <Grow in={true} timeout={50}>
      <div className={styles.root}>
        <PageHeader title={"Statistics"} showBreadcrumbs={false} />
        <Paper elevation={10}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card raised={true} className={styles.cardRoot}>
                <CardHeader
                  title="Ticket Status"
                  subheader="Recent Seven Day Status"
                />
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
                <CardHeader title="Open Tickets" subheader="Current Activity" />
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
                <CardHeader
                  title="Unresolved Tickets"
                  subheader="Open or Pending Tickets"
                />
                <Divider />
                <CardContent className={styles.cardContent}>
                  {typeof statistics.ticketsUnresolved[0] != "undefined" &&
                  statistics.ticketsUnresolved[0].length > 0 ? (
                    <Pie
                      data={{
                        labels: statistics.ticketsUnresolved[0].map(
                          (row) => row.Timeframe
                        ),
                        datasets: [
                          {
                            data: statistics.ticketsUnresolved[0],
                            label: "Number of Unresolved Tickets",
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
                            display: true,
                          },
                        },
                        parsing: {
                          key: "TicketAmount",
                        },
                      }}
                    />
                  ) : (
                    <Typography
                      align="center"
                      style={{ userSelect: "none" }}
                      color="textSecondary"
                    >
                      No Content
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Card raised={true} className={styles.cardRoot}>
                <CardHeader
                  title="Under-Performing Technicians"
                  subheader="Resolved Low or Zero Number of Tickets within Fourteen Days"
                />
                <Divider />
                <CardContent className={styles.cardContent}>
                  <Bar
                    data={{
                      datasets: [
                        {
                          data: statistics.underPerformingTechs[0],
                          label: "Number of Tickets Closed Last 14 Days",
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
                        xAxisKey: "ClosedTickets",
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
