import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createCourse } from '../../APIs/CoursesAPIcall';
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
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	ListItemButton,
	ListSubheader,
	Collapse,
	ListItemAvatar,
} from '@mui/material';
import {
	Add,
	SettingsEthernet,
	ExpandLess,
	ExpandMore,
	StarBorder,
} from '@mui/icons-material';

const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
}));

const AddCourse = () => {
	const { user, token } = isAutheticated();
	const classes = useStyles();
	const [tempTags, setTempTags] = useState('');
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState();

	const [section, setSection] = useState({
		newhosts: [
			{
				sectionName: '',
				sectionDescription: '',
				sectionImage: '',
				sectionVideos: [
					{
						videoName: '',
						videoDescription: '',
						videoLink: '',
						videoThumbnail: '',
					},
				],
			},
		],
	});

	const [values, setValues] = useState({
		courseName: '',
		courseDescription: '',
		courseDate: '',
		courseLocation: '',
		courseImage: '',
		bannerPhoto: '',
		courseDescriptionImage: '',
		courseSection: section.newhosts,
		courseOrganizer: '',
		courseOrganizerId: user._id,
		courseStatus: '',
		courseDemoVideoLink: '',
		courseParticipants: [],
		courseTags: [],
		courseParticipantsLimit: '',
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

	const uploadCourseImage = async () => {
		if (values.courseImage) {
			const storageRef = firebase
				.storage()
				.ref(`/courseImages/${courseName + courseDate}/${values.courseImage.name}`);
			const uploadTask = storageRef.put(values.courseImage);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// progress function ...
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
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
					console.log('Course Image Uploaded');
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
			await createCourse(user._id, values, token).then((data) => {
				console.log(data);
				if (data.error) {
					setError(data.error);
				} else {
					setValues({
						...values,
						courseName: '',
						courseDescription: '',
						courseDate: '',
						courseLocation: '',
						courseImage: '',
						bannerPhoto: '',
						courseDescriptionImage: '',
						courseDemoVideoLink: '',
						courseOrganizer: '',
						courseStatus: '',
						courseParticipants: [],
						courseTags: [],
						getaRedirect: false,
						courseParticipantsLimit: '',
					});
					setError(false);
					alert('Course Created Successfully');
				}
			});
		} else {
			alert('Please Login to Create Course');
		}
	};

	const handleChange = (name) => (course) => {
		setValues({ ...values, [name]: course.target.value });
	};

	const columns = [
		{ id: 'courseName', label: 'Course Name', minWidth: 170 },
		{ id: 'courseParticipants', label: 'Registration', minWidth: 50 },
		{ id: 'courseTime', label: 'Time', minWidth: 170 },
	];

	const handleOnChange = (event, hostindex, layer, softwareIndex) => {
		const { newhosts } = section;
		const copiedHosts = [...newhosts];
		const updatedHosts = copiedHosts.map((host, index) => {
			//find mathcing index to update that item
			if (hostindex === index) {
				//determine what layer of data we need to update
				if (layer === 1) {
					//we need to update activityState, platform etc...
					return {
						...host,
						[event.target.name]: event.target.value,
					};
				} else if (layer === 2) {
					//now we need to find the matching software item to update
					let updatedSoftware = copiedHosts[hostindex].software.map(
						(software, sIndex) => {
							if (softwareIndex === sIndex) {
								return {
									...software,
									[event.target.name]: event.target.value,
								};
							} else {
								return {
									...software,
								};
							}
						}
					);
					return {
						...host,
						software: updatedSoftware,
					};
				} else if (layer === 3) {
					//now we need to find the matching software item to update
					let updatedSoftware = copiedHosts[hostindex].software.map(
						(software, sIndex) => {
							if (softwareIndex === sIndex) {
								return {
									...software,
									vulnerability: {
										...software.vulnerability,
										[event.target.name]: event.target.value,
									},
								};
							} else {
								return {
									...software,
								};
							}
						}
					);
					return {
						...host,
						software: updatedSoftware,
					};
				}
			} else {
				//return all other hosts
				return host;
			}
		});
		setSection({
			newhosts: updatedHosts,
		});
	};

	const createNewHostsForm = () => {
		const { newhosts } = section;

		return newhosts.map((host, hostIndex) => {
			return (
				<div>
					<h4>{`Section ${hostIndex + 1}`}</h4>
					{Object.entries(host).map(([key, value], lvl1Index) => {
						if (Array.isArray(value)) {
							const secondLayerInputs = [...value];
							return (
								<div>
									<strong>Videos:</strong>
									{secondLayerInputs.map((input, softwareIndex) => {
										return Object.entries(input).map(([lvl2Key, lvl2Value]) => {
											if (typeof lvl2Value === 'string') {
												return (
													<div>
														<label>{lvl2Key}</label>{' '}
														<input
															value={lvl2Value}
															name={lvl2Key}
															onChange={(e) => handleOnChange(e, hostIndex, 2, softwareIndex)}
														/>
													</div>
												);
											} else {
												const thirdLayerInputs = { ...lvl2Value };
												return Object.entries(thirdLayerInputs).map(
													([lvl3Key, lvl3Value]) => {
														return (
															<div>
																<label>{lvl3Key}</label>{' '}
																<input
																	name={lvl3Key}
																	value={lvl3Value}
																	onChange={(e) =>
																		handleOnChange(e, hostIndex, 3, softwareIndex)
																	}
																/>
															</div>
														);
													}
												);
											}
										});
									})}
									<button onClick={() => addSoftwareToHost(hostIndex)}>
										Add Videos
									</button>
								</div>
							);
						} else {
							return (
								<div>
									<label>{key}</label>{' '}
									<input
										value={value}
										onChange={(e) => handleOnChange(e, hostIndex, 1)}
										name={key}
									/>
								</div>
							);
						}
					})}
				</div>
			);
		});
	};

	const addNewHost = () => {
		const newHostObj = {
			activityState: '',
			platform: '',
			pushDate: '',
			name: '',
			ip: '',
			software: [
				{
					vulnerability: {
						link: '',
						desc: '',
						cvss: '',
						cve: '',
					},
					vulnerable: '',
					cpe: '',
					version: '',
					vendor: '',
					name: '',
				},
			],
		};
		setSection({
			newhosts: [...section.newhosts, newHostObj],
		});
	};

	const addSoftwareToHost = (hostIndex) => {
		const { newhosts } = section;
		const copiedHosts = [...newhosts];
		const newSoftwareObj = {
			vulnerability: {
				link: '',
				desc: '',
				cvss: '',
				cve: '',
			},
			vulnerable: '',
			cpe: '',
			version: '',
			vendor: '',
			name: '',
		};

		const updatedHosts = copiedHosts.map((host, index) => {
			if (hostIndex === index) {
				return {
					...host,
					software: [...host.software, newSoftwareObj],
				};
			} else {
				return {
					...host,
				};
			}
		});

		setSection({
			newhosts: updatedHosts,
		});
	};

	const handleSubmit = () => {
		console.log(section.newhosts);
	};

	return (
		<>
			<Typography variant="h4" gutterBottom>
				Add Course
				<br />
				<Alert severity="info">
					Please enter Course name before uploading Images
				</Alert>
			</Typography>
			<Grid container spacing={3}>
				<Grid item xs={12} sm={2}>
					<Typography variant="body1" color="initial">
						Course Name
					</Typography>
				</Grid>
				<Grid item xs={12} sm={9}>
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
							onChange={handleChange('courseName')}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Typography variant="body1" color="initial">
						Course Description
					</Typography>
				</Grid>
				<Grid item xs={12} sm={9}>
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
							onChange={handleChange('courseDescription')}
						/>
					</FormControl>
				</Grid>

				<Grid item xs={12} sm={2}>
					<Typography variant="body1" color="initial">
						Course Organizer
					</Typography>
				</Grid>
				<Grid item xs={12} sm={10}>
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
							onChange={handleChange('courseOrganizer')}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Typography variant="body1" color="initial">
						Course Video Demo Link
					</Typography>
				</Grid>
				<Grid item xs={12} sm={10}>
					<FormControl variant="outlined" fullWidth>
						<InputLabel>Video link </InputLabel>
						<OutlinedInput
							required
							fullWidth
							id="courseDemoVideoLink"
							label="Video Demo Link"
							autoComplete="courseDemoVideoLink"
							variant="outlined"
							value={courseDemoVideoLink}
							onChange={handleChange('courseDemoVideoLink')}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Typography variant="body1" color="initial">
						Course Image
					</Typography>
				</Grid>
				<Grid item xs={12} sm={6}>
					<FormControl variant="outlined" fullWidth>
						<input
							type="file"
							name="courseImage"
							onChange={handleCoursePicture('courseImage')}
						/>
					</FormControl>
				</Grid>
				<Grid item xs={12} sm={4}>
					{loading && (
						<CircularProgress
							variant="determinate"
							sx={{ height: '20px', mr: 2 }}
							className={classes.progress}
						/>
					)}
					<Button
						variant="outlined"
						color="primary"
						onClick={uploadCourseImage}
						className={classes.button}>
						Upload
					</Button>
				</Grid>

				<div>
					{createNewHostsForm()}
					<div style={{ margin: '25px 0px' }}>
						{' '}
						<button onClick={addNewHost}>Add Section</button>
					</div>
				</div>

				<Grid item xs={12} sm={2}>
					<Typography variant="body1" color="initial">
						Course Tags
					</Typography>
				</Grid>
				<Grid item xs={12} sm={10}>
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
											setTempTags('');
										}}>
										<Add />
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
						{values.courseTags.map((value, index) => {
							return <Chip key={value} label={value} />;
						})}
					</Box>
				</Grid>
				<Grid item xs={12} sm={10}>
					{error && <Alert severity="error">{error.message}</Alert>}
				</Grid>
				<Grid item xs={11} sm={10} lg={6} sx={{ m: 1 }}></Grid>
				<Button variant="contained" color="primary" onClick={onSubmit}>
					Submit
				</Button>
			</Grid>
		</>
	);
};

export default AddCourse;
