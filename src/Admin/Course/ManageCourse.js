import React from "react";
import Paper from "@mui/material/Paper";
import {
  Typography,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Box,
  Collapse,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCourse, getCourses } from "../../APIs/courseapicall";
import { isAutheticated } from "../../APIs/auth/index";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: "20px 15px",
    fontSize: "1.125rem",
    color: "black",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "1px solid rgba(224, 224, 224, 1)",
  },
  headerItem: {
    padding: "10px 15px",
    fontSize: "0.875rem",
    color: "rgb(33, 33, 33)",
    fontWeight: "500",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(224, 224, 224, 1)",
  },
  headerRow: { fontSize: "0.875rem", color: "rgb(33, 33, 33)", fontWeight: "500" },
  item: { border: "1px solid rgba(224, 224, 224, 1)", margin: "10px", borderRadius: "20px" },
}));

const columns = [
  { id: "courseName", label: "Course Name", minWidth: 170 },
  { id: "courseParticipants", label: "Registration", minWidth: 50 },
  { id: "courseDate", label: "Date", minWidth: 170 },
  { id: "courseTime", label: "Time", minWidth: 170 },
  { id: "courseLocation", label: "Venue", minWidth: 170 },
  { id: "courseParticipantsCount", label: "Participants Count", minWidth: 170 },
  { id: "courseParticipantsLimit", label: "Participants Limit", minWidth: 170 },
];

const ManageCourse = () => {
  const { user, token } = isAutheticated();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getAllCourses = async () => {
    await getCourses().then((data) => {
      setRows(data);
    });
  };

  React.useEffect(() => {
    getAllCourses();
  }, []);

  const handleChangePage = async (course, newPage) => {
    await setPage(newPage);
  };

  const handleChangeRowsPerPage = async (course) => {
    await setRowsPerPage(+course.target.value);
    await setPage(0);
  };

  const handleDelete = async (id) => {
    console.log("delete");
    await deleteCourse(id, token, user._id).then(() => {
      getAllCourses();
    });
  };
  var i = 0;

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Typography variant="h3" gutterBottom>
        All Courses
      </Typography>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell key="101"></TableCell>
                <TableCell key="102">Edit</TableCell>
                <TableCell key="103">Delete</TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                  <>
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      <TableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="edit" href={`/updateCourse/${row._id}`} color="primary">
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          key="nan"
                          aria-label="delete"
                          onClick={() => {
                            handleDelete(row._id);
                          }}
                          color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                      {columns.map((column) => {
                        const value = row[column.id];
                        console.log(value);

                        return <TableCell key={column.id}>{Array.isArray(value) ? value.length : value}</TableCell>;
                      })}
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                              Course Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Participant Email</TableCell>
                                  <TableCell>Participant Name</TableCell>
                                  <TableCell>Participant Phone</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {row.courseParticipants.map((participant) => (
                                  <TableRow key={participant}>
                                    <TableCell component="th" scope="row">
                                      {participant}
                                    </TableCell>
                                    <TableCell>Not Available</TableCell>
                                    <TableCell>Not Available</TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default ManageCourse;
