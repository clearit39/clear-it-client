import React from "react";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getAllUsers } from "../../APIs/userAPIcalls";
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridClasses } from "@mui/x-data-grid";

function CustomToolbar() {
  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport
        // fileName={`users_${new Date().toJSON().slice(0, 10).replace(/-/g, "/")}.csv`}
        csvOptions={{
          separator: ",",
        }}
      />
    </GridToolbarContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "80px",
    paddingBottom: "70px",
    width: "90%",
    padding: "19px",
    paddingLeft: `${theme.spacing.unit * 5}px `,
    marginLeft: "auto",
    marginRight: "auto",
    minHeight: "70vh",
    backgroundColor: "#e8f4f8",
  },
}));

const columns = [
  { field: "id", headerName: "ID", width: 10, hide: true },
  { field: "displaypicture", headerName: "Display Picture", width: 10, hide: true },
  { field: "firstname", headerName: "First Name", width: 170 },
  { field: "lastname", headerName: "Last Name", width: 170 },
  { field: "university", headerName: "University", width: 170 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "phone", headerName: "Phone", width: 120 },
  { field: "currposition", headerName: "Education", width: 100 },
  { field: "schoolyear", headerName: "School Year", width: 80 },
  { field: "organization", headerName: "Organization", width: 220 },
  { field: "upcominginternship", headerName: "Upcoming Internship", width: 170 },
  { field: "internshiploc", headerName: "Internship Location", width: 150 },
  {
    field: "industryChoice",
    headerName: "Industry Choice",
    width: 170,
    valueFormatter: (params) => {
      return params.value.join(", ");
    },
  },
  {
    field: "careerChoice",
    headerName: "Career",
    width: 170,
    valueFormatter: (params) => {
      return params.value.join(", ");
    },
  },
  {
    field: "industryChoice",
    headerName: "Industry",
    width: 170,
    valueFormatter: (params) => {
      return params.value.join(", ");
    },
  },
  { field: "role", headerName: "Role", width: 70 },
];

const ManageUsers = () => {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const getAllCourses = async () => {
    setLoading(true);
    await getAllUsers().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setRows(data);
        console.log(data);
      }
    });
    setLoading(false);
  };

  React.useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        All Users
      </Typography>
      <Paper sx={{ height: 600, width: "100%", overflow: "hidden" }}>
        <DataGrid
          loading={loading}
          columns={columns}
          getRowId={(row) => row._id}
          rows={rows}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </Paper>
    </>
  );
};

export default ManageUsers;
