import React, { useEffect, useState } from "react";

// Redux State
import { useSelector, useDispatch } from "react-redux";

//Material-UI
import { Grow, MenuItem, Select } from "@material-ui/core";

// Basic Components
import PageHeader from "../../components/PageHeader/PageHeader.jsx";

//import AddUserDialog from "./AddUserDialog";

// Material Table
import MaterialTable from "@material-table/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { tableIcons } from "../../utilities/DataTable/DataTableIcons.jsx";
import { AiFillPrinter } from "react-icons/ai";
import {
  getPermissionsAllAction,
  getUsersAllAction,
  putPermissionsAction,
  putTblUsersApprovedAction,
} from "../../redux/user/userActions.js";
import { Satellite } from "@material-ui/icons";

// import store from "../../redux/store";

// import {
//   // permissionsSelector,
//   permissionsUsersEmailSelector,
//   permissionsRolesNameSelector,
//   permissionsModulesNameSelector,
//   permissionsLoadingSelector,
// } from "../../redux/permissions/permissionsReducer";

//Redux

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5em",
  },
}));

const JoinOrganizationRequests = () => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const tableRows = useSelector((state) => state.User.usersApproved);

  const loading = useSelector((state) => state.User.userLoading);
  const organizationID = useSelector(
    (state) => state.User.user.tblOrganization.ID
  );

  useEffect(() => {
    if (organizationID.toString().length > 0) {
      dispatch(getUsersAllAction(organizationID));
    }
  }, [dispatch, organizationID]);

  const handleApproved = (tableRow) => {
    if (organizationID.toString().length > 0) {
      dispatch(putTblUsersApprovedAction(tableRow.ID, true, organizationID));
    }
  };

  const handleDenied = (tableRow) => {
    if (organizationID.toString().length > 0) {
      dispatch(putTblUsersApprovedAction(tableRow.ID, false, organizationID));
    }
  };

  const columns = [
    {
      title: "User ID",
      field: "ID",
      editable: "never",
    },
    {
      title: "First Name",
      field: "FirstName",
      editable: "never",
    },
    {
      title: "Last Name",
      field: "LastName",
      editable: "never",
    },
    {
      title: "Email",
      field: "Email",
      editable: "never",
    },
  ];

  return (
    <>
      <div className={styles.root}>
        <PageHeader title={"Organizaton Requests"} />
        <Grow in={true} timeout={150}>
          <div>
            <MaterialTable
              title="Approve Users"
              icons={tableIcons}
              columns={columns}
              data={tableRows}
              isLoading={loading}
              options={{
                // draggable: true,
                // sorting: true,
                emptyRowsWhenPaging: false,
                pageSize: 10,
                pageSizeOptions: [10, 20, 50, 100, 200, 500],
                rowStyle: {
                  fontSize: 16,
                },
                actionsColumnIndex: -1,
                selection: false,
                addRowPosition: "first",
                exportAllData: true,
                exportMenu: [
                  {
                    label: "Export PDF",
                    exportFunc: (cols, datas) => ExportPdf(cols, datas, "test"),
                  },
                  {
                    label: "Export CSV",
                    exportFunc: (cols, datas) => ExportCsv(cols, datas, "test"),
                  },
                ],
              }}
              // editable={{
              //   onRowUpdate: (updatedRow, oldRow) =>
              //     new Promise((resolve, reject) => {
              //       dispatch(
              //         putPermissionsAction({
              //           updatedRow,
              //           oldRow,
              //         })
              //       );
              //       resolve();
              //     }),
              // }}
              actions={[
                {
                  icon: tableIcons.Approve,
                  tooltip: "Approve",
                  isFreeAction: false,
                  onClick: (event, data) => handleApproved(data),
                },
                {
                  icon: tableIcons.Deny,
                  tooltip: "Deny",
                  isFreeAction: false,
                  onClick: (event, data) => handleDenied(data),
                },
              ]}
            />
          </div>
        </Grow>
      </div>
    </>
  );
};

export default JoinOrganizationRequests;
