import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import Avatar from '@mui/material/Avatar';
import { NavLink } from 'react-router-dom';
import aboutImg from '../assets/aboutImg.svg'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';
import DraftsIcon from '@mui/icons-material/Drafts';
import { api } from '../backend';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "55px",
		[theme.breakpoints.down('md')]: {
			margin: "3px",
		},
	},
}));
const Profile = () => {
	const navigate = useNavigate();
	const [userData, setuserData] = useState(JSON.parse(localStorage.getItem('user')));
	// setuserData(JSON.parse(localStorage.getItem('user')));
	const classes = useStyles();

	useEffect(() => {
		const callProfilePage = async () => {
			// try {
			const res = await fetch(`${api}/profile`, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});
			const data = await res.json();
			console.log('profile' + data);
			if (!res.status === 200) {
				const error = new Error(res.error);
				throw error;
			}
			// } catch (err) {
			//     console.log(err);
			//     navigate('/login');
			// }
		};

		callProfilePage();
		// setuserData(JSON.parse(localStorage.getItem('user')));
		if (localStorage.getItem('jwtoken') == undefined) {
			navigate('/login');
		}
	}, []);

	if (!userData) {
		return <p>Please Signin to Continue</p>
	} else {
		return (
			<>
				<Container maxWidth="xl">
					<Box sx={{ mt: 3, p: 3, minHeight: '80vh' }}>
						<Grid container spacing={2}>
							
							<Grid item xs={12} sm={4}>
								<Box className={classes.root} >
									<h1>My Profile</h1>
									<h4>Hello <span>{userData.name}</span></h4>
									<p>Occupation - <span>{userData.occupation}</span></p>
									<p>Preparing For - <span>{userData.preparingFor}</span></p>
									<p>Current Class - <span>{userData.currentClass}</span></p>
									<p>Phone - <span>{userData.phone}</span></p>
								</Box>
							</Grid>
							<Grid item xs={12} sm={4}>
								<Box className={classes.root} >
								<img  src={aboutImg} alt="aboutImg" />
								</Box>
							</Grid>
							<Grid item xs={12} sm={4}>
								<Box className={classes.root} >
									<List>
										<ListItem disablePadding>
											<ListItemButton>
												<ListItemIcon>
													<Avatar>{userData.name.slice(0, 1)}</Avatar>
												</ListItemIcon>
												<ListItemText primary={userData.username} />
											</ListItemButton>
										</ListItem>
										<ListItem disablePadding>
											<ListItemButton>
												<ListItemIcon>
													<DraftsIcon />
												</ListItemIcon>
												<ListItemText primary={userData.email} />
											</ListItemButton>
										</ListItem>
									</List>
									<Divider />
									<List>
										<ListItem disablePadding>
											<NavLink className="nav" to="/logout">
												<ListItemButton>
													<ListItemIcon>
														<LogoutIcon />
													</ListItemIcon>
													<ListItemText primary="LogOut" />
												</ListItemButton>
											</NavLink>

										</ListItem>
									</List>
								</Box>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</>
		);

	}
};

export default Profile;
