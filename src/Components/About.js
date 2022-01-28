import React from 'react';
import aboutImg from '../assets/aboutImg.svg'
import { Box, Container, Grid } from '@mui/material/';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "55px",
        [theme.breakpoints.down('md')]: {
              margin:"3px",
        },
    },
  }));

const About = () => {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="xl">
                <Box sx={{ mt: 3, p: 3, height: '100vh' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box className={classes.root} >
                                <h1>About Us</h1>
                                <p>Clearlt is a one-stop solution for the students to learn, practice, and enhance their knowledge for competitive exams at very affordable prices.
                                </p>
                                <p>
                                    We bring the best teachers across the country to student's computer screens, no worries to go to Kota or in any branded offline coaching, the experience of offline classes at your home.

                                    Clearit recreates the experience that students had before Covid-19.
                                </p>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <img className="aboutImg" src={aboutImg} alt="aboutImg" />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default About;
