import React, { useEffect, useState } from "react";

// Redux State
import { useSelector, useDispatch } from "react-redux";

//Material-UI
import { Chip, Grow, ListItemText, MenuItem, Popover, Select, TextField } from "@material-ui/core";

// Basic Components
import PageHeader from "../../components/PageHeader/PageHeader.jsx";

//import AddUserDialog from "./AddUserDialog";

import { SwatchesPicker } from 'react-color'

// Material Table
import MaterialTable from "@material-table/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { tableIcons } from "../../utilities/DataTable/DataTableIcons.jsx";
import { AiFillPrinter } from "react-icons/ai";
import { deleteTagAction, postTagsAction, putTagCategoriesAction, putTagsAction } from "../../redux/user/userActions.js";
import { Autocomplete } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5em",
  },
  swatch: {
    padding: '5px',
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
  },
  swatch2: {
    padding: '10px',
    marginBottom: "5px",
    background: '#fff',
    borderRadius: '1px',
    boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
    height: "10px",
  },
}));

const Tags = () => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const tableRows = useSelector((state) => state.User.tags);

  const loading = useSelector((state) => state.User.loading);

  const organizationID = useSelector(
    (state) => state.User.user.tblOrganization.ID
  );

  const [uniqTagCategories, setUniqTagCategories] = useState([
    ...new Set(tableRows.map((tag) => tag.Category)),
  ]);

//   useEffect(() => {
//     if (organizationID.toString().length > 0) {
//       dispatch(getPermissionsAllAction(organizationID));
//     }
//   }, [dispatch, organizationID]);

  useEffect(() => {
    setUniqTagCategories([...new Set(tableRows.map((tag) => tag.Category)),
    ]);
  }, [tableRows]);

  const categoryReduce = uniqTagCategories.reduce(function(acc, cur, i) {    
    acc[cur] = cur;
    return acc;
    }, {});

  const columns = [
    {
      title: "Tag Type",
      field: "Type",
     // editable: "onAdd",
      // can't make type editable because this is PK and there is no ID
    },
    {
      title: "Category",
      field: "Category",
      lookup: categoryReduce,
      // editComponent: props => (
      //       <Select
      //           onChange={e => {props.onChange(e.target.value)}}
      //           value={props.value === undefined ? "Hardware" : props.value}
      //       >
      //           {uniqTagCategories.map((Category) => (
      //               <MenuItem key={Category} value={Category}>
      //               <   ListItemText primary={Category} />
      //               </MenuItem>
      //           ))}
      //       </Select>
      //   )
    },
    {
      title: "Chip Color",
      field: "BackgroundColor",
      render: (text, record) => {
        return <div className={styles.swatch} style={{ backgroundColor: text.BackgroundColor }}></div>
      },
      editComponent: props => (
            <React.Fragment>
                <div className={styles.swatch2} style={{ backgroundColor: props.rowData.BackgroundColor }}></div>
                <SwatchesPicker
                    value={props.value}
                    onChange={e => {props.onChange(e.hex)}}
                />
            </React.Fragment>
      ),
      editable: "onUpdate",
    },
    {
      title: "Text Color",
      field: "Color",
      lookup: { "#000000": "Black", "#ffffff": "White" },
      editable: "onUpdate",
    },
    {
        title: "Preview",
        render: (text, record) => {
           return (
            <Chip
                label={text.Type}
                key={text.Type}
                style={{ backgroundColor: text.BackgroundColor, color: text.Color }}
            />
           )
        },
        editable: "never"
    },
  ];

  return (
    <>
      <div className={styles.root}>
        <PageHeader title={"Manage Tags"} />
        <Grow in={true} timeout={150}>
          <div>
            <MaterialTable
              title="Tags"
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
              editable={{
                onRowAdd: (newRow) =>
                  new Promise((resolve, reject) => {

                    const tagType = newRow.Type;
                    const category = newRow.Category;

                    if (tagType !== "" && category !== undefined)
                    {
                        dispatch(
                            postTagsAction(tagType, category)
                        );
                    }

                    resolve();
                }),
                onRowDelete: (selectedRow) =>
                  new Promise((resolve, reject) => {

                    const tagType = selectedRow.Type;

                    if (tagType !== "")
                    {
                        dispatch(
                            deleteTagAction(tagType)
                        );
                    }

                    resolve();
                }),
                onRowUpdate: (updatedRow, oldRow) =>
                  new Promise((resolve, reject) => {

                    const tagType = updatedRow.Type;
                    const category = updatedRow.Category;

                    const oldBgColor = oldRow.BackgroundColor;
                    const newBgColor = updatedRow.BackgroundColor;
                    const oldColor = oldRow.Color;
                    const newColor = updatedRow.Color;

                    dispatch(
                      putTagsAction(tagType, category),
                    )
                    .then(() => {
                      if (oldBgColor !== newBgColor || oldColor !== newColor)
                      {
                        dispatch(
                          putTagCategoriesAction(category, newBgColor, newColor),
                        )
                      }
                    })

                    resolve();
                }),
              }}
            />
          </div>
        </Grow>
      </div>
    </>
  );
};

export default Tags;
