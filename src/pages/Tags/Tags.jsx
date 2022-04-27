import React, { useEffect, useState } from "react";

// Redux State
import { useSelector, useDispatch } from "react-redux";

//Material-UI
import { Button, Chip, Grid, Grow, ListItemText, MenuItem, Popover, Select, TextField, Typography } from "@material-ui/core";

// Basic Components
import PageHeader from "../../components/PageHeader/PageHeader.jsx";

//import AddUserDialog from "./AddUserDialog";

import { SwatchesPicker } from 'react-color'

// Material Table
import MaterialTable, { MTableToolbar } from "@material-table/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { tableIcons } from "../../utilities/DataTable/DataTableIcons.jsx";
import { deleteTagAction, postTagsAction, putTagCategoriesAction, putTagsAction } from "../../redux/user/userActions.js";
import AddTagCategory from "../../components/AddTagCategory/AddTagCategory.jsx";

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
  buttons: {
    marginLeft: "10px",
    marginRight: "10px"
  }
}));

const Tags = () => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const tableRows = useSelector((state) => state.User.tags);

  const tagCategories = useSelector((state) => state.User.tagCategories);

  const loading = useSelector((state) => state.User.loading);

  const organizationID = useSelector(
    (state) => state.User.user.tblOrganization.ID
  );

  const [uniqTagCategories, setUniqTagCategories] = useState(tagCategories.map((record) => {return record.Category}));

  const [openAddTagCategory, setOpenAddTagCategory] = useState(false);

  useEffect(() => {
    setUniqTagCategories(tagCategories.map((record) => {return record.Category}));
  }, [tagCategories]);

  const categoryReduce = uniqTagCategories.reduce(function(acc, cur, i) {    
    acc[cur] = cur;
    return acc;
    }, {});

  const columns = [
    {
      title: "Tag Type",
      field: "Type",
      editable: "onAdd",
    },
    {
      title: "Category",
      field: "Category",
      lookup: categoryReduce,
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

  const handleTagCategoryOpen = () => {
    setOpenAddTagCategory(true);
  }

  const handleTagCategoryClose = () => {
    setOpenAddTagCategory(false);
  }

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
                        const fromCategories = tagCategories.find((record) => record.Category === category);

                        dispatch(
                            postTagsAction(tagType, fromCategories.CategoryID, organizationID)
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
                            deleteTagAction(tagType, organizationID)
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
                      putTagsAction(tagType, category, organizationID),
                    )
                    .then(() => {
                      if (oldBgColor !== newBgColor || oldColor !== newColor)
                      {
                        const fromCategories = tableRows.find((record) => record.Category === category);

                        dispatch(
                          putTagCategoriesAction(fromCategories.CategoryID, newBgColor, newColor),
                        )
                      }
                    })

                    resolve();
                }),
              }}
              components={{
                Toolbar: props => (
                  <div>
                    <MTableToolbar {...props} />
                    <Grid 
                      container
                      item
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      xl={12}
                      spacing={2}
                    >
                      <Grid container item justifyContent="center" xs={9} sm={9} md={9} lg={9} xl={9}>
                        <Typography style={{textAlign: "center", margin: "auto 10px"}}>
                          <strong>Warning:</strong> Changing <em>Chip Color</em> or <em>Text Color</em> of a Tag will change the colors of all Tags from the same Category
                        </Typography>
                      </Grid>
                      <Grid container item justifyContent="center" xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Button
                          onClick={handleTagCategoryOpen}
                          variant="contained"
                          color="primary"
                          className={styles.buttons}
                        >
                          Add Tag Category
                        </Button>
                      </Grid>
                    </Grid>
                  </div>
                )
            }}
            />
          </div>
        </Grow>
      </div>

      <AddTagCategory
        open={openAddTagCategory}
        handleOpen={handleTagCategoryOpen}
        handleClose={handleTagCategoryClose}
      />
    </>
  );
};

export default Tags;
