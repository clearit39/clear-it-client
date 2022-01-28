import React from 'react';
import homeImg from '../Images/home.svg';
import { Box, Container, Grid } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import IITData from './IITData';
import NEETData from './NEETData';
import FacultiesData from './FacultiesData';
import IITCards from './IITCards';
const useStyles = makeStyles((theme) => ({
    root: {
        margin: "55px",
        [theme.breakpoints.down('md')]: {
            margin: "3px",
        },
    },
}));

const Home = () => {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="xl">
                <Box sx={{ mt: 3, p: 3, minHeight: '100vh' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box className={classes.root} >
                                <h2>TEST YOUR PREPERQATION WITH <span>CLEARIT...</span></h2>
                                <p><strong>NOT ONLY LEARN IT BUT CLEAR IT...</strong></p>
                                <p>
                                    We bring the best teachers across the country to student's computer screens, no worries to go to Kota or in any branded offline coaching, the experience of offline classes at your home.

                                    Clearit recreates the experience that students had before Covid-19.
                                </p>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <img className="aboutImg" src={homeImg} alt="homeImg" />
                        </Grid>
                        <Grid item xs={12}>
                            <Box className={classes.root} >
                                <h2>ITT-JEE</h2>
                                <p>Muqem Khan (Mk) Sir is known for his brilliant content and he always tends to give his best to the students. He teaches with an objective i.e. to assure the success of his students.
                                </p>
                                {IITData.map((val,index)=>{
                                return <IITCards key={index} id={index} cname={val.cname} tname={val.tname} cimage={val.cimage} crate={val.crate} cprice={val.cprice} />
                                })}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box className={classes.root} >
                                <h2>NEET</h2>
                                <p>Muqem Khan (Mk) Sir is known for his brilliant content and he always tends to give his best to the students. He teaches with an objective i.e. to assure the success of his students.
                                </p>
                                {NEETData.map((val,index)=>{
                                return <IITCards key={index} id={index} cname={val.cname} tname={val.tname} cimage={val.cimage} crate={val.crate} cprice={val.cprice} />
                                })}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box className={classes.root} >
                                <h2>Our Faculties</h2>
                                {FacultiesData.map((val,index)=>{
                                return <IITCards key={index} id={index} cname={val.cname} cimage={val.cimage} crate={val.crate} cprice={val.cprice} />
                                })}
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default Home;
