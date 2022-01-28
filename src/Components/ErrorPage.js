import React from 'react';
import error404 from '../Images/error404.svg';
import { Button, Box, Container, Grid } from '@mui/material/';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "55px",
        [theme.breakpoints.down('md')]: {
            margin: "3px",
        },
    },
    button: {
        backgroundColor: "#FF5166",
        '&:hover': {
            background: "#f00",
        },
    },
}));

const ErrorPage = () => {
    const classes = useStyles();
    return (
        <>
            <Container maxWidth="xl">
                <Box sx={{ mt: 3, p: 3, minHeight: '60vh' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box className={classes.root} >
                                <h2>ERROR 404 <span>PAGE NOT FOUND...</span></h2>
                                <p><strong>Maybe Bgoot has broken this page
                                    Come back to the homepage</strong></p>

                                <NavLink className="nav" to="/">
                                    <Button 
                                    className={classes.button}
                                        halfWidth
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Back to Home
                                    </Button>
                                    
                                </NavLink>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box className={classes.root} >
                                <img src={error404} alt='404 Page' />
                            </Box>
                        </Grid>



                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default ErrorPage;
