import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { isAutheticated } from '../../APIs/auth/index';
import { makeStyles } from '@mui/styles';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
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
} from '@mui/material';
import { Add, SettingsEthernet } from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
}));

const AddQuestions = () => {
	const { user, token } = isAutheticated();
	const classes = useStyles();
	const [tempTags, setTempTags] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState();
	const [values, setValues] = useState({
		qNo: '',
		title: '',
		answer: '',
		options: [],
		examName: '',
		testName: '',
		subjectName: '',
	});

	const { qNo, title, answer, options, examName, testName, subjectName } =
		values;

	// const uploadCourseImage = async () => {
	// 	if (values.courseImage) {
	// 		const storageRef = firebase
	// 			.storage()
	// 			.ref(`/courseImages/${courseName + courseDate}/${values.courseImage.name}`);
	// 		const uploadTask = storageRef.put(values.courseImage);
	// 		uploadTask.on(
	// 			'state_changed',
	// 			(snapshot) => {
	// 				// progress function ...
	// 				const progress = Math.round(
	// 					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
	// 				);
	// 				setLoading(progress);
	// 			},
	// 			(error) => {
	// 				// Error function ...
	// 				console.log(error);
	// 			},
	// 			() => {
	// 				// complete function ...
	// 				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
	// 					setValues({ ...values, courseImage: downloadURL });
	// 				});
	// 				console.log('Course Image Uploaded');
	// 			}
	// 		);
	// 	}
	// };

	// const handleCoursePicture = (name) => (course) => {
	// 	const file = course.target.files[0];
	// 	setValues({ ...values, [name]: file });
	// };

	const onSubmit = async (course) => {
		if (isAutheticated()) {
			// await createCourse(user._id, values, token).then((data) => {
			// 	console.log(data);
			// 	if (data.error) {
			// 		setError(data.error);
			// 	} else {
			// 		setValues({
			// 			...values,
			// 			courseName: '',
			// 			courseDescription: '',
			// 			courseDate: '',
			// 			courseLocation: '',
			// 			courseImage: '',
			// 			bannerPhoto: '',
			// 			courseDescriptionImage: '',
			// 			courseDemoVideoLink: '',
			// 			courseOrganizer: '',
			// 			courseStatus: '',
			// 			courseParticipants: [],
			// 			courseTags: [],
			// 			getaRedirect: false,
			// 			courseParticipantsLimit: '',
			// 		});
			// 		setError(false);
			// 		alert('Course Created Successfully');
			// 	}
			// });
		} else {
			alert('Please Login to Create Course');
		}
	};

	const handleChange = (name) => (course) => {
		setValues({ ...values, [name]: course.target.value });
	};

	return (
		<>
			<Typography variant="h4" gutterBottom>
				Add Questions for Test
				<br />
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={4}>
					<Typography variant="body1" color="initial">
						Question Number
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Question Number</InputLabel>
						<OutlinedInput
							required
							fullWidth
							id="questionNumber"
							label="question Number"
							autoComplete="questionNumber"
							variant="outlined"
							value={qNo}
							onChange={handleChange('qNo')}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography variant="body1" color="initial">
						Question
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Question Body</InputLabel>
						<OutlinedInput
							required
							fullWidth
							id="questionName"
							label="question Name"
							autoComplete="questionName"
							variant="outlined"
							value={title}
							onChange={handleChange('title')}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography variant="body1" color="initial">
						Correct Answer
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Correct Answer</InputLabel>
						<OutlinedInput
							required
							fullWidth
							id="answer"
							label="answer"
							autoComplete="answer"
							variant="outlined"
							value={answer}
							onChange={handleChange('answer')}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={4}>
					<Typography variant="body1" color="initial">
						Options
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
						<InputLabel> Options</InputLabel>
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
												courseTags: [...values.options, tempTags],
											});
											setTempTags('');
										}}>
										<Add />
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
						{values.options.map((value, index) => {
							return <Chip key={value} label={value} />;
						})}
					</Box>
				</Grid>

				<Grid item xs={12} sm={4}>
					<Typography variant="body1" color="initial">
						Exam Name
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Exam Name</InputLabel>
						<OutlinedInput
							required
							fullWidth
							id="questionNumber"
							label="question Number"
							autoComplete="questionNumber"
							variant="outlined"
							value={examName}
							onChange={handleChange('examName')}
						/>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={4}>
					<Typography variant="body1" color="initial">
						Test Name
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Test Name</InputLabel>
						<OutlinedInput
							required
							fullWidth
							id="questionNumber"
							label="question Number"
							autoComplete="questionNumber"
							variant="outlined"
							value={testName}
							onChange={handleChange('testName')}
						/>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={4}>
					<Typography variant="body1" color="initial">
						Subject Name
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Subject Name</InputLabel>
						<OutlinedInput
							required
							fullWidth
							id="questionNumber"
							label="question Number"
							autoComplete="questionNumber"
							variant="outlined"
							value={subjectName}
							onChange={handleChange('subjectName')}
						/>
					</FormControl>
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

export default AddQuestions;
