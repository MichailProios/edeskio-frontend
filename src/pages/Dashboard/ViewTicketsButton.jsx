// Basic Dependencies
import React from "react";
import { Link } from "react-router-dom";

//Material-UI
import {
  Card,
  CardActionArea,
  CardHeader,
  Divider,
  CardContent,
  Typography,
  Box,
} from "@material-ui/core";

//Material-UI Styles
import { makeStyles, useTheme } from "@material-ui/styles";

//Icons
import { CgViewList } from "react-icons/cg";

//Set NewRandomizedButton Styles
/******************************************************************************************************************/
const useStyles = makeStyles((theme) => ({
  root: {
    width: "16em",
  },
  title: {
    textAlign: "center",
  },
  content: {
    textAlign: "center",
  },
  actionArea: {
    userDrag: "none",
  },
}));
/******************************************************************************************************************/

//Main component
/******************************************************************************************************************/
const ViewTicketsButton = () => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <Card className={styles.root} raised={true}>
      <CardActionArea
        className={styles.actionArea}
        component={Link}
        to="/Dashboard/ViewTickets"
      >
        <CardHeader
          title={<CgViewList size={100} color={theme.palette.primary.main} />}
          className={styles.title}
        />
        <Divider />
        <CardContent className={styles.content}>
          <Typography component={"span"}>
            <Box fontWeight="fontWeightBold" fontSize={16}>
              View Sumbitted Tickets
            </Box>
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
/******************************************************************************************************************/

export default ViewTicketsButton;
