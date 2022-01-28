import React from 'react'
import testImg from '../Images/testImg.svg';
import { Box, Container, Grid } from '@mui/material/';
import { makeStyles } from '@mui/styles';
import TestCards from './TestCards';
const useStyles = makeStyles((theme) => ({
    root: {
        margin: "55px",
        [theme.breakpoints.down('md')]: {
            margin: "3px",
        },
    },
}));
const Testseries = () => {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="xl">
                <Box sx={{ mt: 3, p: 3, minHeight: '100vh' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box className={classes.root} >
                                <h2>Give <span>Tests</span> Increase temperament</h2>
                                <p><strong>ClearIt provides you two different Testing patterns
                                    for analyizin mistakes and watching prograss.</strong></p>
                                <TestCards />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <img className="aboutImg" src={testImg} alt="homeImg" />
                        </Grid>



                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default Testseries;
