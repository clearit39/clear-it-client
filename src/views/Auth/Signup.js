import { React, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { api } from '../../backend';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function SignUp() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", username: "", email: "", phone: "", password: "", cpassword: "", preparingFor: "", currentClass: "", occupation: ""
    });
    const [error, setError] = useState(false);
    let name, value;
    const handleInputs = (e) => {
        setError(false);
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    };

    const signup = async (user) => {
        return await fetch(`${api}/register`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                return response.json();
            })
            .catch((error) => console.log(error));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        setError(false);
        const { name, username, email, phone, password, cpassword, preparingFor, currentClass, occupation } = user;
        // if (password!==cpassword){
        //     setError("Password and Confirm password not matching"); 
        // }else{
        if (
            !username ||
            !email ||
            !name ||
            phone.length !== 10 ||
            !preparingFor ||
            !currentClass ||
            !occupation ||
            !/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(email)
        ) {
            setError("Please fill all the fields correctly");
        } else if(password!==cpassword){
            setError("Passwords not matching"); 
        }else{
            await signup(user).then((data) => {
                console.log(data);
                if (data.error) {
                    console.log(data.error.keyPattern)
                    const erorIN = JSON.stringify(data.error.keyValue).split('"');
                    console.log(data.error.keyPattern.username)
                    console.log(data.error.keyPattern.email)
                    setError(`User with similar ${erorIN[1]} already exist`);

                } else {
                    alert("Signup Successfull")
                    console.log(data)
                    navigate('/login');
                }
            })
                .catch((err) => console.log(err))
        }
    }
    console.log("error", error)
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    {error && (
                        <Alert severity='error'>{error}</Alert>
                    )}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="name"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Full Name"
                                    autoFocus
                                    value={user.name}
                                    onChange={handleInputs}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="username"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    autoFocus
                                    value={user.username}
                                    onChange={handleInputs}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Preparing for*</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="preparingFor"
                                        name="preparingFor"
                                        value={user.preparingFor}
                                        onChange={handleInputs}
                                    >
                                        <MenuItem value={'IIT-JEE'}>IIT-JEE</MenuItem>
                                        <MenuItem value={'NEET'}>NEET</MenuItem>
                                        <MenuItem value={'Boards'}>Boards</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Current Class*</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="currentClass"
                                        name="currentClass"
                                        value={user.currentClass}
                                        onChange={handleInputs}
                                    >
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={9}>9</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={11}>11</MenuItem>
                                        <MenuItem value={12}>12</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Occupation *</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="occupation"
                                        name="occupation"
                                        value={user.occupation}
                                        onChange={handleInputs}
                                    >
                                        <MenuItem value={'Teacher'}>Teacher</MenuItem>
                                        <MenuItem value={'Student'}>Student</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    type="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    value={user.email}
                                    onChange={handleInputs}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="phone"
                                    type="tel"
                                    label="Phone Number"
                                    name="phone"
                                    autoComplete="phone"
                                    value={user.phone}
                                    onChange={handleInputs}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    value={user.password}
                                    onChange={handleInputs}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="cpassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="cpassword"
                                    autoComplete="confirm-password"
                                    value={user.cpassword}
                                    onChange={handleInputs}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <NavLink className='link' to='/login'>
                                    <Link variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </NavLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}