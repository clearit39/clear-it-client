import React from 'react';
import { Box, Container, Grid } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SchoolIcon from '@mui/icons-material/School';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import ListIcon from '@mui/icons-material/List';
import { NavLink } from 'react-router-dom';
import StudymaterialCard from './StudymaterialCard';
import StudymaterialCardNeetData from './StudymaterialCardNeetData';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "55px",
    [theme.breakpoints.down('md')]: {
      margin: "3px",
    },
  },
  side: {
    display: "none",
    [theme.breakpoints.down('md')]: {
      display: "block",
    },
  },
  side2: {
    display: "block",
    [theme.breakpoints.down('md')]: {
      display: "none",
    },
  },
}));



const Studymaterial = () => {
  const classes = useStyles();


  const [items, setItems] = React.useState(StudymaterialCardNeetData);
  const [ctype, setCtype] = React.useState('All Courses');

  const filterItem = (subname) => {
    const updatedSubjects = StudymaterialCardNeetData.filter((curSub) => {
      return curSub.sname === subname
    });
    setItems(updatedSubjects);
  };

  const filterSideItem = (subname) => {
    const updatedSubjects = StudymaterialCardNeetData.filter((curSub) => {
      return curSub.type === subname
    });
    setItems(updatedSubjects);
    setCtype(subname);
  };

  const buttons = [
    <Button key="one" onClick={() => setItems(StudymaterialCardNeetData)}>All</Button>,
    <Button key="two" onClick={() => filterItem('Physics')}>Physics</Button>,
    <Button key="three" onClick={() => filterItem('Chemistry')}>Chemistry</Button>,
    <Button key="four" onClick={() => filterItem('Biology')}>Biology</Button>,
  ];
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ mt: 5, width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button >
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <NavLink className="nav" exact activeClassName="active" to="/studymaterial"><ListItemText primary="Study-Material" /></NavLink>
        </ListItem>
        {/* {['Study-Material'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
      </List>
      <Divider />
      <List>
        {['All Courses', 'Complete Courses', 'Module-wise Courses', 'Chapter-wise Courses', 'Crash Courses'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <FiberManualRecordTwoToneIcon />
            </ListItemIcon>
            {index === 0 ? <ListItemText primary={text} onClick={() => setItems(StudymaterialCardNeetData)} /> : <ListItemText primary={text} onClick={() => filterSideItem(text)} />}
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ mt: 3, p: 3, minHeight: '100vh' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
              <Box className={classes.side} >
                {['left'].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>
                      <ListIcon sx={{ fontSize: 40 }} color="error" />
                    </Button>
                    <SwipeableDrawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                      onOpen={toggleDrawer(anchor, true)}
                    >
                      {list(anchor)}
                    </SwipeableDrawer>
                  </React.Fragment>
                ))}
              </Box>
              <Box className={classes.side2}
                sx={{ width: 'auto' }}
                role="presentation"
              >

                <List>
                  <ListItem button >
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <NavLink className="nav" exact activeClassName="active" to="/studymaterial"><ListItemText primary="Study-Material" /></NavLink>
                  </ListItem>
                  {/* {['Study-Material'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))} */}
                </List>
                <Divider />
                <List>
                  {['All Courses', 'Complete Courses', 'Module-wise Courses', 'Chapter-wise Courses', 'Crash Courses'].map((text, index) => (
                    <ListItem button key={text}>
                      <ListItemIcon>
                        <FiberManualRecordTwoToneIcon />
                      </ListItemIcon>
                      {index === 0 ? <ListItemText primary={text} onClick={() => setItems(StudymaterialCardNeetData)} /> : <ListItemText primary={text} onClick={() => filterSideItem(text)} />}
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid item xs={12} sm={10}>
              <h3>NEET</h3>
              <p className='sm'>One lilner about iit jee would be here ,this contenrt would be added after words accordingly to the requirenments</p>
              <h3>{ctype}</h3>
              <ButtonGroup color="primary" aria-label="medium secondary button group">
                {buttons}
              </ButtonGroup>
              <h3>    </h3>
              {
                items.map((val) => {
                  const { id, sname, lname, type, subthumbnail } = val;
                  return <StudymaterialCard key={id} subthumbnail={subthumbnail} sname={sname} lname={lname} type={type} />
                })
              }
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default Studymaterial;
