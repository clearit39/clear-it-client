import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import logo from '../logo.svg';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Grid, ButtonGroup, Button } from '@mui/material';
import List from './Lists';
import FooterData from './FooterData';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';

const useStyles = makeStyles((theme) => ({
  iconcolor:{
    color: '#ffffff',
  },
  root: {
    margin: "10px",
    [theme.breakpoints.down('md')]: {
      margin: "3px",
    },
  },
}));
function Copyright() {
  return (
    <Typography variant="body2">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        ClearIt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  const classes = useStyles();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        color:'#ffffff'
      }}
    >
      <CssBaseline />
      <Box sx={{ p: 3, backgroundColor: '#3a3838' }}>
        <Grid container spacing={2}>
          {FooterData.map((val, index) => {
            return (<>
              <Grid item xs={12} sm={4}>
                <Box className={classes.root} >
                  <List key={index}
                   id={index} 
                    li1={val.li1} li1link={val.li1link}
                    li2={val.li2} li2link={val.li2link}
                    li3={val.li3} li13ink={val.li3link}
                    li4={val.li4} li4link={val.li4link}
                  />
                </Box>
              </Grid>
            </>);
          })}
          <Grid item xs={12} sm={4}>
            <Box className={classes.root} >
              <img src={logo} alt="ClearIT" />
              <br />
              <br />
              <ButtonGroup variant="text" color="primary" aria-label="text button group">
                <Button>
                  <Link href="http://www.instagram.com/clearit" className={classes.link} target="_blank" >
                    <InstagramIcon className={classes.iconcolor} />
                  </Link>
                </Button>
                <Button>
                  <Link href="http://www.youtube.com" className={classes.link} target="_blank" >
                    <YouTubeIcon className={classes.iconcolor} />
                  </Link>
                </Button>
                <Button>
                  <Link href="http://www.facebook.com" className={classes.link} target="_blank" >
                    <FacebookIcon className={classes.iconcolor} />
                  </Link>
                </Button>
              </ButtonGroup>
              <br />
              <br />
              <p>Path to success is to take massive,
                determined action that leads to incredible
                success.</p>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <center>
            <Container >
              <Typography variant="body1">
                All Rights Recived
              </Typography>
              <Copyright />
            </Container>
            </center>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}