import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import EventIcon from '@mui/icons-material/Event';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import StarBorder from '@mui/icons-material/StarBorder';
import PersonIcon from '@mui/icons-material/Person';
import { Typography } from '@mui/material';
import { isAutheticated } from '../APIs/auth/index';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
	link: {
		textDecoration: 'none',
		color: '#000',
	},
}));

export default function NestedList() {
	const classes = useStyles();
	const { user } = isAutheticated();
	const [open, setOpen] = React.useState({
		users: false,
		courses: false,
		academy: false,
		questions: false,
	});

	const handleClick = (input) => (course) => {
		setOpen({ ...open, [input]: !open[input] });
	};

	return (
		<List
			sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
			component="nav"
			aria-labelledby="nested-list-subheader"
			subheader={
				<ListSubheader component="div" id="nested-list-subheader">
					<Typography variant="h5">Welcome {user.name}</Typography>
				</ListSubheader>
			}>
			<ListItemButton onClick={handleClick('users')}>
				<ListItemIcon>
					<GroupIcon />
				</ListItemIcon>
				<ListItemText primary="Users" />
				{open.users ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open.users} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<Link className={classes.link} to="/allUsers">
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								<PersonIcon />
							</ListItemIcon>
							<ListItemText primary="Manage Users" />
						</ListItemButton>
					</Link>
				</List>
			</Collapse>

			<ListItemButton onClick={handleClick('courses')}>
				<ListItemIcon>
					<EventIcon />
				</ListItemIcon>
				<ListItemText primary="Courses" />
				{open.courses ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>

			<Collapse in={open.courses} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<Link className={classes.link} to="/createCourse">
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText primary="Create Course" />
						</ListItemButton>
					</Link>
					<Link className={classes.link} to="/manageCourse">
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								<EventAvailableIcon />
							</ListItemIcon>
							<ListItemText primary="Manage Courses" />
						</ListItemButton>
					</Link>
					<Link className={classes.link} to="/courseAllotment">
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								<EventAvailableIcon />
							</ListItemIcon>
							<ListItemText primary="Course Allotment" />
						</ListItemButton>
					</Link>
				</List>
			</Collapse>

			<ListItemButton onClick={handleClick('questions')}>
				<ListItemIcon>
					<EventIcon />
				</ListItemIcon>
				<ListItemText primary="Test Series" />
				{open.questions ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>

			<Collapse in={open.questions} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					<Link className={classes.link} to="/createQuestion">
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								<AddIcon />
							</ListItemIcon>
							<ListItemText primary="Create Questions" />
						</ListItemButton>
					</Link>
					<Link className={classes.link} to="/manageQuestions">
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								<EventAvailableIcon />
							</ListItemIcon>
							<ListItemText primary="Manage Questions" />
						</ListItemButton>
					</Link>
				</List>
			</Collapse>
		</List>
	);
}
