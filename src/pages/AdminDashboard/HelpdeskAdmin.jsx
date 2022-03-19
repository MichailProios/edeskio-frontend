import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MaterialTable from "@material-table/core";

import { tableIcons } from "../../utilities/DataTable/DataTableIcons.jsx";

import {
  Grow,
  Grid,
  IconButton,
  Button,
  Typography,
  Divider,
} from "@material-ui/core";
import { palette } from "@material-ui/system";


import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "1.5em",
  },

}));
const HelpdeskAdmin = () => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const [stateRowData, setStateRowData] = useState([]);


  const columns = [
    //{ title: "ID", field: "id", editable: false },
    {
      title: "ID",
      field: "ID",
      editable: "never",
    },
    {
      title: "UserID",
      field: "UserID",
      editable: "never",
    },
    {
      title: "UserName",
      field: "UserName",
      editable: "never",
    },
    {
      title: "Email",
      field: "Email",
      editable: "never",
    },
    {
      title: "Role",
      field: "Role",
      //editable: "never",
    },
  ];

  const data = [
    {
      ID: 1,
      UserID: 1,
      UserName: "gibbca",
      Email: "gibbca@example.com",
      Role: "Admin",
    },
    {
      ID: 2,
      UserID: 2,
      UserName: "proim",
      Email: "proim@example.com",
      Role: "Admin",
    },
    {
      ID: 3,
      UserID: 4,
      UserName: "userA",
      Email: "userA@example.com",
      Role: "Tech",
    },
    {
      ID: 4,
      UserID: 3,
      UserName: "userB",
      Email: "userB@example.com",
      Role: "Basic",
    }
  ]

  return (
    <div className={styles.root}>
      <Grow in={true} timeout={100}>
        <MaterialTable
          title="Roles"
          icons={tableIcons}
          columns={columns}
          data={data}
          //isLoading={loading}
          options={{
            emptyRowsWhenPaging: false,
            pageSize: 10,
            pageSizeOptions: [10, 20, 50, 100, 200, 500],
            rowStyle: (rowData) => {
            },
            //selection: true,
            actionsColumnIndex: -1,
            addRowPosition: "first",
          }}
          editable={{
            onRowAdd: (newRow) =>
              new Promise((resolve, reject) => {
                // dispatch(post_(newRow));
                resolve();
              }),
            onRowDelete: (selectedRow) =>
              new Promise((resolve, reject) => {
                // dispatch(
                //   delete(

                //   ),
                // );
                resolve();
              }),
            onRowUpdate: (updatedRow, oldRow) =>
              new Promise((resolve, reject) => {
                

                resolve();
              }),
          }}
        />
      </Grow>
    </div>
  );
};

export default HelpdeskAdmin;
