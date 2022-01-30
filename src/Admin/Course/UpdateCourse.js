import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { updateCourse, getCourse } from "../../APIs/CoursesAPIcall";
import { isAutheticated } from "../../APIs/auth/index";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  Grid,
  Container,
  TextField,
  Button,
  Box,
  Chip,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Add, SettingsEthernet } from "@mui/icons-material";


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
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const UpdateCourses = () => {
  const classes = useStyles();
  const { user, token } = isAutheticated();
  const { courseId } = useParams();
  const [tempTags, setTempTags] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState();

  const [values, setValues] = useState({
    courseName: "",
    courseDescription: "",
    courseDate: "",
    courseLocation: "",
    courseImage: "",
    bannerPhoto: "",
    courseDescriptionImage: "",
    courseOrganizer: "",
    courseOrganizerId: user._id,
    courseStatus: "",
    courseDemoVideoLink: "",
    courseParticipants: [],
    courseTags: [],
    courseParticipantsLimit: "",
    courseParticipantsCount: "",
  });

  const {
    courseName,
    courseDescription,
    courseDate,
    courseLocation,
    courseImage,
    courseOrganizer,
    courseDemoVideoLink,
    courseStatus,
    courseParticipants,
    courseTags,
  } = values;

  const preload = async () => {
    console.log("courseId", courseId);
    await getCourse(courseId).then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setValues({
          ...values,
          courseName: data.courseName,
          courseDescription: data.courseDescription,
          courseDate: data.courseDate,
          courseLocation: data.courseLocation,
          courseImage: data.courseImage,
          bannerPhoto: data.bannerPhoto,
          courseDescriptionImage: data.courseDescriptionImage,
          courseOrganizer: data.courseOrganizer,
          courseDemoVideoLink: data.courseDemoVideoLink,
          courseStatus: data.courseStatus,
          courseParticipants: data.courseParticipants,
          courseTags: data.courseTags,
          courseParticipantsLimit: data.courseParticipantsLimit,
          courseParticipantsCount: data.courseParticipantsCount,
        });
      }
    });
  };

  useEffect((courseId) => {
    preload(courseId);
  }, []);

  const uploadCourseImage = async () => {
    if (values.courseImage) {
      const storageRef = firebase.storage().ref(`/courseImages/${courseName + courseDate}/${values.courseImage.name}`);
      const uploadTask = storageRef.put(values.courseImage);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function ...
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setLoading(progress);
        },
        (error) => {
          // Error function ...
          console.log(error);
        },
        () => {
          // complete function ...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            setValues({ ...values, courseImage: downloadURL });
          });
          console.log("Course Image Uploaded");
        }
      );
    }
  };

  const handleCoursePicture = (name) => (course) => {
    const file = course.target.files[0];
    setValues({ ...values, [name]: file });
  };

  const onSubmit = async (course) => {
    if (isAutheticated()) {
      await updateCourse(courseId, token, values).then((data) => {
        console.log(data);
        if (data.error) {
          setError(data.error);
        } else {
          setError(false);
          alert("Course updated successfully");
        }
      });
    } else {
      alert("Please Login to Update Course");
    }
  };

  const handleChange = (name) => (course) => {
    setValues({ ...values, [name]: course.target.value });
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Update Course
        <br />
        <Alert severity="info">Please enter Course name before uploading Images</Alert>
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Typography variant="" color="initial">
            Course Name
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Course Name</InputLabel>
            <OutlinedInput
              required
              fullWidth
              id="courseName"
              label="Course Name"
              autoComplete="courseName"
              variant="outlined"
              value={courseName}
              onChange={handleChange("courseName")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" color="initial">
            Course Description
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <FormControl variant="outlined" fullWidth>
            <TextField
              rows={6}
              required
              fullWidth
              multiline
              id="courseDescription"
              label="Course Description"
              autoComplete="courseDescription"
              variant="outlined"
              value={courseDescription}
              onChange={handleChange("courseDescription")}
            />
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} sm={4}>
          <Typography variant="body2" color="initial">
            Course Date
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="DateTimePicker"
                value={courseDate}
                onChange={(newValue) => {
                  setValues({ ...values, courseDate: newValue });
                }}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid> */}
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" color="initial">
            Course Organizer
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Course Organizer</InputLabel>
            <OutlinedInput
              required
              fullWidth
              id="courseOrganizer"
              label="Course Organizer"
              autoComplete="courseOrganizer"
              variant="outlined"
              value={courseOrganizer}
              onChange={handleChange("courseOrganizer")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" color="initial">
            Course Youtube Link
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Youtube link </InputLabel>
            <OutlinedInput
              required
              fullWidth
              id="courseDemoVideoLink"
              label="Youtube Link"
              autoComplete="courseDemoVideoLink"
              variant="outlined"
              value={courseDemoVideoLink}
              onChange={handleChange("courseDemoVideoLink")}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" color="initial">
            Course Image
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl variant="outlined" fullWidth>
            <input type="file" name="courseImage" onChange={handleCoursePicture("courseImage")} />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          {loading && (
            <CircularProgress variant="determinate" sx={{ height: "20px", mr: 2 }} className={classes.progress} />
          )}
          <Button variant="outlined" color="primary" onClick={uploadCourseImage} className={classes.button}>
            Upload
          </Button>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="body2" color="initial">
            Course Tags
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
            <InputLabel> Course Tags</InputLabel>
            <OutlinedInput
              id=" Course Tags"
              label=" Course Tags"
              autoComplete="Course Tags"
              value={tempTags}
              onChange={(course) => setTempTags(course.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => {
                      setValues({
                        ...values,
                        courseTags: [...values.courseTags, tempTags],
                      });
                      setTempTags("");
                    }}>
                    <Add />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mt: 1 }}>
            {values.courseTags.map((value, index) => {
              return <Chip key={value} label={value} />;
            })}
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          {error && <Alert severity="error">{error.message}</Alert>}
        </Grid>
        <Grid item xs={11} sm={6} lg={6} sx={{ m: 1 }}></Grid>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Submit
        </Button>
      </Grid>
    </>
  );
};

export default UpdateCourses;
